import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosConfig';
import axios from 'axios';

export const fetchStatuses = createAsyncThunk(
    'demand/fetchStatuses',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/demand/statuses');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Durum bilgileri yüklenirken hata oluştu');
        }
    }
);

export const fetchDemands = createAsyncThunk(
    'demand/fetchDemands',
    async (filters, {rejectWithValue}) => {
        try {
            const params = {};
            if (filters.status && filters.status !== 'all') {
                params.status = filters.status;
            }

            const response = await axiosInstance.get('/demand', {params});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Talepler yüklenirken hata oluştu');
        }
    }
);

export const fetchAllDemandsForAdmin = createAsyncThunk(
    'demand/fetchAllDemandsForAdmin',
    async (filters, {rejectWithValue}) => {
        try {
            const params = {};
            if (filters && filters?.status && filters.status !== 'all') {
                params.status = filters.status;
            }

            const response = await axiosInstance.get('/demand/all', {params});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Talepler yüklenirken hata oluştu');
        }
    }
);


export const createDemand = createAsyncThunk(
    'demand/createDemand',
    async (demandData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/demand', demandData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Talep oluşturulurken hata oluştu');
        }
    }
);

export const updateDemand = createAsyncThunk(
    'demand/updateDemand',
    async ({demandId, updateData}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put(`/demand/${demandId}`, updateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Talep güncellenirken hata oluştu');
        }
    }
);

export const createDemandAnswer = createAsyncThunk(
    'demand/createDemandAnswer',
    async (answerData, {rejectWithValue}) => {
        const response = await axiosInstance.post('/demand-answer', {
            answerText: answerData.answer,
            demandId: answerData.demandId
        });
        return response.data;
    }
);

const initialState = {
    demands: [],
    statuses: [],
    selectedDemand: null,
    loading: false,
    error: null,
    filters: {
        status: 'all',
        search: ''
    }
};

const demandSlice = createSlice({
    name: 'demand',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload};
        },
        setSelectedDemand: (state, action) => {
            state.selectedDemand = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Statuses
            .addCase(fetchStatuses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.loading = false;
                state.statuses = action.payload;
            })
            .addCase(fetchStatuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Demands
            .addCase(fetchDemands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDemands.fulfilled, (state, action) => {
                state.loading = false;
                state.demands = action.payload;
            })
            .addCase(fetchDemands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch ALL Demands
            .addCase(fetchAllDemandsForAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllDemandsForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.demands = action.payload;
            })
            .addCase(fetchAllDemandsForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Demand
            .addCase(createDemand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDemand.fulfilled, (state, action) => {
                state.loading = false;
                state.demands.unshift(action.payload);
            })
            .addCase(createDemand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Demand
            .addCase(updateDemand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDemand.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.demands.findIndex(demand => demand.id === action.payload.id);
                if (index !== -1) {
                    state.demands[index] = action.payload;
                }
            })
            .addCase(updateDemand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Demand Answer
            .addCase(createDemandAnswer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDemandAnswer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.demands.findIndex(demand => demand.id === action.payload.demandId);
                if (index !== -1) {
                    state.demands[index].status = 'ANSWERED';
                    state.demands[index].answer = action.payload.answerText;
                }
            })
            .addCase(createDemandAnswer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {setFilters, setSelectedDemand, clearError} = demandSlice.actions;
export default demandSlice.reducer; 