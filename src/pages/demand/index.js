'use client';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';
import {Alert, Box, CircularProgress, Container, IconButton} from '@mui/material';
import {Add as AddIcon, Refresh as RefreshIcon} from '@mui/icons-material';
import {createDemand, fetchDemands, fetchStatuses, setFilters, searchDemands} from '@/store/slices/demandSlice';
import {fetchCategories} from '@/store/slices/categorySlice';
import CustomButton from '@/components/common/CustomButton';
import CustomTitle from '@/components/common/CustomTitle';
import CustomDropdown from '@/components/common/CustomDropdown';
import CreateDemandForm from '@/components/demand/CreateDemandForm';
import DemandDetailModal from '@/components/demand/DemandDetailModal';
import DemandList from '@/components/demand/DemandList';
import SearchBar from '@/components/common/SearchBar';
import {USER_ROLE} from "@/utils/constants";

export default function DemandPage() {

    const dispatch = useDispatch();
    const router = useRouter();
    const {user} = useSelector((state) => state.auth);
    const {demands, statuses, loading, error, filters} = useSelector((state) => state.demand);
    const {categories} = useSelector((state) => state.category);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedDemand, setSelectedDemand] = useState(null);

    useEffect(() => {
        if (!user || !user.roles.includes(USER_ROLE)) {
            router.push('/auth');
            return;
        }

        dispatch(fetchCategories());
        dispatch(fetchStatuses());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchDemands(filters));
    }, [dispatch, filters, user, router]);

    const handleCreateDemand = async (values, {resetForm}) => {
        try {
            const selectedCategory = categories.find(c => c.id === values.categoryId);
            const demandData = {
                ...values,
                categoryKey: selectedCategory.key
            };
            await dispatch(createDemand(demandData)).unwrap();
            setCreateModalOpen(false);
            resetForm();
        } catch (error) {
            // Hata zaten Redux state'inde
        }
    };

    const handleFilterChange = (field, value) => {
        if (field === 'title') {
            if (value) {
                dispatch(searchDemands(value));
            } else {
                dispatch(fetchDemands(filters));
            }
        } else {
            dispatch(setFilters({[field]: value}));
        }
    };

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Box sx={{mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <CustomTitle component="h1">
                    Talepler
                </CustomTitle>
                <CustomButton
                    startIcon={<AddIcon/>}
                    onClick={() => setCreateModalOpen(true)}
                    sx={{bgcolor: '#1877F2', width: '240px', height: '40px', '&:hover': {bgcolor: '#1664D9'}}}
                >
                    Yeni Talep Oluştur
                </CustomButton>
            </Box>

            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}

            <Box sx={{mb: 4, display: 'flex', gap: 2}}>
                <SearchBar
                    placeholder="Taleplerde ara..."
                    onChange={handleFilterChange.bind(null, 'title')}
                />
                <Box sx={{minWidth: 200}}>
                    <CustomDropdown
                        label="Durum"
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        options={[
                            {value: 'all', label: 'Tümü'},
                            ...statuses.map(status => ({
                                value: status.key,
                                label: status.desc
                            }))
                        ]}
                    />
                </Box>
            </Box>

            {loading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <DemandList
                    demands={demands}
                    categories={categories}
                    statuses={statuses}
                    onDemandClick={setSelectedDemand}
                />
            )}

            <CreateDemandForm
                open={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateDemand}
                categories={categories}
            />

            <DemandDetailModal
                open={Boolean(selectedDemand)}
                onClose={() => setSelectedDemand(null)}
                demand={selectedDemand}
                categories={categories}
                statuses={statuses}
            />
        </Container>
    );
}