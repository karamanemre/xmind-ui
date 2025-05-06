import { FormControl, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatuses } from '../../store/slices/demandSlice';

const StatusFilter = ({ value, onChange, sx }) => {
    const dispatch = useDispatch();
    const { statuses } = useSelector((state) => state.demand);

    useEffect(() => {
        dispatch(fetchStatuses());
    }, [dispatch]);

    const getStatusColor = (statusKey) => {
        switch(statusKey) {
            case 'OPEN':
                return '#1877F2';
            case 'CLOSED':
                return '#666';
            case 'IN_PROGRESS':
                return '#FF9100';
            default:
                return '#666';
        }
    };

    const getStatusLabel = (statusDesc) => {
        if (!statusDesc) return 'Bilinmeyen';
        return statusDesc;
    };

    return (
        <FormControl size="small" sx={{ minWidth: 160, ...sx }}>
            <Select
                value={value || 'all'}
                onChange={onChange}
                displayEmpty
                sx={{
                    backgroundColor: '#fff',
                    height: '36px',
                    fontSize: '14px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1877F2',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1877F2',
                    },
                    '& .MuiSelect-select': {
                        padding: '6px 12px',
                    },
                    borderRadius: '8px',
                }}
            >
                <MenuItem value="all" sx={{ fontSize: '14px', minHeight: '32px' }}>Tüm Durumlar</MenuItem>
                {Array.isArray(statuses) && statuses.map((status) => (
                    <MenuItem 
                        key={status.id} 
                        value={status.key}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            minHeight: '32px'
                        }}
                    >
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: getStatusColor(status.key)
                            }}
                        />
                        {getStatusLabel(status.desc)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StatusFilter; 