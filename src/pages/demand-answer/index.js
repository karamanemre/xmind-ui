import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DemandAnswerModal from '../../components/demand/DemandAnswerModal';
import { fetchAllDemandsForAdmin, createDemandAnswer } from '../../store/slices/demandSlice';
import { getColumns } from './columns';
import StatusFilter from '../../components/common/StatusFilter';
import CustomTitle from '../../components/common/CustomTitle';
import {DataGrid} from "@mui/x-data-grid";

const DemandAnswerPage = () => {
    const dispatch = useDispatch();
    const { demands, loading: demandLoading } = useSelector((state) => state.demand);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [answer, setAnswer] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    useEffect(() => {
        dispatch(fetchAllDemandsForAdmin({ status: selectedStatus }));
    }, [dispatch, selectedStatus]);

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedDemand(null);
        setAnswer('');
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

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px',
                height: '40px'  // Başlık ile aynı yükseklikte olması için
            }}>
                <CustomTitle sx={{ margin: 0, fontSize: '1.5rem', lineHeight: '40px' }}>
                    Talep Yönetimi
                </CustomTitle>
                <StatusFilter
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    sx={{ 
                        height: '40px',
                        '& .MuiInputBase-root': {
                            height: '40px'
                        }
                    }}
                />
            </div>

            <DataGrid
                rows={demands || []}
                columns={getColumns(handleDemandAnswer)}
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
        </div>
    );
};

export default DemandAnswerPage;
