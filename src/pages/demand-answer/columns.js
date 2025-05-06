import {
    Email,
    CalendarToday,
    Title,
    Description,
    RadioButtonChecked,
    Reply,
    Settings
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export const getColumns = (handleDemandAnswer) => [
    {
        field: 'requesterMail',
        headerName: 'Talep Eden',
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Email sx={{ fontSize: 20, color: '#FF5777' }} />
                <span>Talep Eden</span>
            </div>
        ),
    },
    {
        field: 'createdDate',
        headerName: 'Talep Tarihi',
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarToday sx={{ fontSize: 20, color: '#00C853' }} />
                <span>Talep Tarihi</span>
            </div>
        ),
    },
    {
        field: 'title',
        headerName: 'Talep Konusu',
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Title sx={{ fontSize: 20, color: '#1877F2' }} />
                <span>Talep Konusu</span>
            </div>
        ),
    },
    {
        field: 'description',
        headerName: 'Talep Açıklaması',
        flex: 2,
        sortable: false,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Description sx={{ fontSize: 20, color: '#AA00FF' }} />
                <span>Talep Açıklaması</span>
            </div>
        ),
    },
    {
        field: 'status',
        headerName: 'Durum',
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioButtonChecked sx={{ fontSize: 20, color: '#FF9100' }} />
                <span>Durum</span>
            </div>
        ),
        renderCell: (params) => (
            <span className={`status-${params.value.toLowerCase()}`}
                style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: params.value === 'OPEN' ? '#E3F2FD' : '#F5F5F5',
                    color: params.value === 'OPEN' ? '#1877F2' : '#666',
                    fontSize: '0.875rem'
                }}>
                {params.value === 'OPEN' ? 'Beklemede' : params.value}
            </span>
        ),
    },
    {
        field: 'actions',
        headerName: 'Aksiyonlar',
        flex: 1,
        sortable: false,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings sx={{ fontSize: 20, color: '#2196F3' }} />
                <span>Aksiyonlar</span>
            </div>
        ),
        renderCell: (params) => (
            <Tooltip title={params.row.status === 'OPEN' ? 'Cevapla' : 'Bu talep yanıtlandı'}>
                <span>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            if (params.row.status === 'OPEN') {
                                handleDemandAnswer(params.row);
                            }
                        }}
                        disabled={params.row.status !== 'OPEN'}
                        sx={{
                            color: params.row.status === 'OPEN' ? '#1877F2' : '#E5E7EB',
                            '&:hover': {
                                bgcolor: params.row.status === 'OPEN' ? 'rgba(24, 119, 242, 0.04)' : 'transparent',
                            }
                        }}
                    >
                        <Reply />
                    </IconButton>
                </span>
            </Tooltip>
        ),
    }
]; 