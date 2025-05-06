import CustomModal from '../common/CustomModal';
import CustomButton from '../common/CustomButton';
import { Box, Typography } from '@mui/material';

const ConfirmStatusModal = ({ visible, onCancel, onConfirm, loading }) => {
    return (
        <CustomModal
            open={visible}
            onClose={onCancel}
            title="Talebi Kapat"
            titleProps={{
                sx: {
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                }
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography>
                    Bu talebi kapatmak istediğinizden emin misiniz?
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <CustomButton
                    onClick={onCancel}
                    sx={{
                        bgcolor: '#F5F5F5',
                        color: '#666',
                        height: '32px',
                        minWidth: '80px',
                        fontSize: '0.875rem',
                        '&:hover': {
                            bgcolor: '#EEEEEE',
                        }
                    }}
                >
                    İptal
                </CustomButton>
                <CustomButton
                    onClick={onConfirm}
                    loading={loading}
                    sx={{
                        bgcolor: '#00C853',
                        color: '#fff',
                        height: '32px',
                        minWidth: '100px',
                        fontSize: '0.875rem',
                        '&:hover': {
                            bgcolor: '#00B84D',
                        }
                    }}
                >
                    Evet, Kapat
                </CustomButton>
            </Box>
        </CustomModal>
    );
};

export default ConfirmStatusModal; 