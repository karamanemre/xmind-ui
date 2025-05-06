import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DemandAnswerModal from '../../components/demand/DemandAnswerModal';
import ConfirmStatusModal from '../../components/demand/ConfirmStatusModal';
import { fetchAllDemandsForAdmin, createDemandAnswer, updateDemandStatus, searchDemands } from '../../store/slices/demandSlice';
import { getColumns } from './columns';
import StatusFilter from '../../components/common/StatusFilter';
import CustomTitle from '../../components/common/CustomTitle';
import SearchBar from '@/components/common/SearchBar';
import {DataGrid} from "@mui/x-data-grid";
import { Box } from '@mui/material';

const DemandAnswerPage = () => {
    const dispatch = useDispatch();
    const { demands, loading: demandLoading } = useSelector((state) => state.demand);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [demandToClose, setDemandToClose] = useState(null);
    const [answer, setAnswer] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        if (searchTitle && searchTitle.trim()) {
            dispatch(searchDemands(searchTitle));
        } else {
            dispatch(fetchAllDemandsForAdmin({ status: selectedStatus }));
        }
    }, [dispatch, selectedStatus, searchTitle]);

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedDemand(null);
        setAnswer('');
    };

    const handleConfirmModalCancel = () => {
        setIsConfirmModalVisible(false);
        setDemandToClose(null);
    };

    const handleAnswer = async () => {
        try {
            await dispatch(createDemandAnswer({
                answer: answer,
                demandId: selectedDemand.id
            })).unwrap();
            
            setIsModalVisible(false);
            setSelectedDemand(null);
            setAnswer('');
            dispatch(fetchAllDemandsForAdmin({ status: selectedStatus }));
        } catch (error) {
            console.error('Talep cevaplama hatası:', error);
        }
    };

    const handleDemandAnswer = (demand) => {
        setSelectedDemand(demand);
        setIsModalVisible(true);
    };

    const handleDemandStatusChange = (demandId) => {
        setDemandToClose(demandId);
        setIsConfirmModalVisible(true);
    };

    const handleConfirmStatusChange = async () => {
        try {
            await dispatch(updateDemandStatus({ demandId: demandToClose, status: 'CLOSED' })).unwrap();
            setIsConfirmModalVisible(false);
            setDemandToClose(null);
            dispatch(fetchAllDemandsForAdmin({ status: selectedStatus }));
        } catch (error) {
            console.error('Talep statüsü güncelleme hatası:', error);
        }
    };

    const handleFilterStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSearch = (value) => {
        if (value) {
            dispatch(searchDemands(value));
        } else {
            dispatch(fetchAllDemandsForAdmin({ status: selectedStatus }));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px',
                height: '40px'
            }}>
                <CustomTitle sx={{ margin: 0, fontSize: '1.5rem', lineHeight: '40px' }}>
                    Talep Yönetimi
                </CustomTitle>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <SearchBar
                        placeholder="Taleplerde ara..."
                        onChange={handleSearch}
                    />
                    <StatusFilter
                        value={selectedStatus}
                        onChange={handleFilterStatusChange}
                        sx={{ 
                            height: '40px',
                            '& .MuiInputBase-root': {
                                height: '40px'
                            }
                        }}
                    />
                </Box>
            </div>

            <DataGrid
                rows={demands || []}
                columns={getColumns(handleDemandAnswer, handleDemandStatusChange)}
                disableRowSelectionOnClick
            />

            <DemandAnswerModal
                visible={isModalVisible}
                onCancel={handleModalCancel}
                onSubmit={handleAnswer}
                selectedDemand={selectedDemand}
                answer={answer}
                setAnswer={setAnswer}
                loading={demandLoading}
            />

            <ConfirmStatusModal
                visible={isConfirmModalVisible}
                onCancel={handleConfirmModalCancel}
                onConfirm={handleConfirmStatusChange}
                loading={demandLoading}
            />
        </div>
    );
};

export default DemandAnswerPage;
