import {
    Email,
    CalendarToday,
    Title,
    Description,
    RadioButtonChecked,
    Reply,
    Settings,
    CheckCircle
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const getColumns = (handleDemandAnswer, handleStatusChange) => {
    const { t } = useTranslation();
    
    return [
    {
        field: 'requesterMail',
        headerName: t('demandAnswer.requester'),
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Email sx={{ fontSize: 20, color: '#FF5777' }} />
                <span>{t('demandAnswer.requester')}</span>
            </div>
        ),
    },
    {
        field: 'createdDate',
        headerName: t('demandAnswer.requestDate'),
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarToday sx={{ fontSize: 20, color: '#00C853' }} />
                <span>{t('demandAnswer.requestDate')}</span>
            </div>
        ),
    },
    {
        field: 'title',
        headerName: t('demandAnswer.requestSubject'),
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Title sx={{ fontSize: 20, color: '#1877F2' }} />
                <span>{t('demandAnswer.requestSubject')}</span>
            </div>
        ),
    },
    {
        field: 'description',
        headerName: t('demandAnswer.requestDescription'),
        flex: 2,
        sortable: false,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Description sx={{ fontSize: 20, color: '#AA00FF' }} />
                <span>{t('demandAnswer.requestDescription')}</span>
            </div>
        ),
    },
    {
        field: 'status',
        headerName: t('demandAnswer.status'),
        flex: 1,
        sortable: true,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioButtonChecked sx={{ fontSize: 20, color: '#FF9100' }} />
                <span>{t('demandAnswer.status')}</span>
            </div>
        ),
        renderCell: (params) => (
            <span
                style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: params.value === 'OPEN' ? '#E3F2FD' : '#F5F5F5',
                    color: params.value === 'OPEN' ? '#1877F2' : '#666',
                    fontSize: '0.875rem'
                }}>
                {params.value === 'OPEN' ? t('demandAnswer.pending') : t(`demandAnswer.${params.value.toLowerCase()}`)}
            </span>
        ),
    },
    {
        field: 'actions',
        headerName: t('demandAnswer.actions'),
        flex: 1,
        sortable: false,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings sx={{ fontSize: 20, color: '#2196F3' }} />
                <span>{t('demandAnswer.actions')}</span>
            </div>
        ),
        renderCell: (params) => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tooltip title={params.row.status === 'OPEN' ? t('demandAnswer.reply') : t('demandAnswer.requestAnswered')}>
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
                <Tooltip title={t('demandAnswer.closeStatus')}>
                    <span>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(params.row.id);
                            }}
                            disabled={params.row.status === 'CLOSED'}
                            sx={{
                                color: params.row.status !== 'CLOSED' ? '#00C853' : '#E5E7EB',
                                '&:hover': {
                                    bgcolor: params.row.status !== 'CLOSED' ? 'rgba(0, 200, 83, 0.04)' : 'transparent',
                                }
                            }}
                        >
                            <CheckCircle />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        ),
    }
]}; 