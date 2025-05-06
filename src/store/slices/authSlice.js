import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosConfig';

const API_URL = '/auth';

const storage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/authenticate`, credentials);
      storage.setItem('token', response.data.accessToken);
      storage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Giriş başarısız');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/register`, userData);
      storage.setItem('token', response.data.accessToken);
      storage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kayıt başarısız');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = storage.getItem('refreshToken');
      const response = await axiosInstance.post(`${API_URL}/refresh-token`, {}, {
        headers: {
          'Authorization': `Bearer ${refreshTokenValue}`
        }
      });
      storage.setItem('token', response.data.accessToken);
      storage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Token yenileme başarısız');
    }
  }
);

const initialState = {
  user: {
    email: storage.getItem('userEmail'),
    roles: JSON.parse(storage.getItem('userRoles') || '[]')
  },
  token: storage.getItem('token'),
  refreshToken: storage.getItem('refreshToken'),
  loading: false,
  error: null,
  isAuthenticated: !!storage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      storage.removeItem('token');
      storage.removeItem('refreshToken');
      storage.removeItem('userEmail');
      storage.removeItem('userRoles');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
          roles: action.payload.roles
        };
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        storage.setItem('userEmail', action.payload.email);
        storage.setItem('userRoles', JSON.stringify(action.payload.roles));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
          roles: action.payload.roles
        };
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        storage.setItem('userEmail', action.payload.email);
        storage.setItem('userRoles', JSON.stringify(action.payload.roles));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        if (action.payload.email && action.payload.roles) {
          state.user = {
            email: action.payload.email,
            roles: action.payload.roles
          };
          storage.setItem('userEmail', action.payload.email);
          storage.setItem('userRoles', JSON.stringify(action.payload.roles));
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        storage.removeItem('token');
        storage.removeItem('refreshToken');
        storage.removeItem('userEmail');
        storage.removeItem('userRoles');
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 