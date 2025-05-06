import CustomModal from '../common/CustomModal';
import CustomButton from '../common/CustomButton';
import { CustomTextField } from '../common/CustomInput';

const DemandAnswerModal = ({ 
    visible, 
    onCancel, 
    onSubmit, 
    selectedDemand, 
    answer, 
    setAnswer, 
    loading 
}) => {
    return (
        <CustomModal
            open={visible}
            onClose={onCancel}
            title="Talebi Cevapla"
        >
            <div className="demand-details" style={{
                backgroundColor: '#F5F8FF',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px'
            }}>
                <div className="detail-item" style={{ marginBottom: '8px' }}>
                    <span className="label" style={{ fontWeight: 500, color: '#666' }}>Talep Eden:</span>
                    <span className="value" style={{ marginLeft: '8px' }}>{selectedDemand?.requesterMail}</span>
                </div>
                <div className="detail-item" style={{ marginBottom: '8px' }}>
                    <span className="label" style={{ fontWeight: 500, color: '#666' }}>Konu:</span>
                    <span className="value" style={{ marginLeft: '8px' }}>{selectedDemand?.title}</span>
                </div>
                <div className="detail-item">
                    <span className="label" style={{ fontWeight: 500, color: '#666' }}>Açıklama:</span>
                    <span className="value" style={{ marginLeft: '8px' }}>{selectedDemand?.description}</span>
                </div>
            </div>

            <CustomTextField
                multiline
                minRows={4}
                maxRows={8}
                fullWidth
                placeholder="Cevabınızı yazın..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        padding: '12px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1877F2',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1877F2',
                        }
                    },
                    '& .MuiOutlinedInput-input': {
                        minHeight: '120px !important',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        '&::placeholder': {
                            color: '#666',
                            opacity: 0.8
                        }
                    }
                }}
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <CustomButton
                    onClick={onCancel}
                    sx={{
                        bgcolor: '#F5F5F5',
                        color: '#666',
                        '&:hover': {
                            bgcolor: '#EEEEEE',
                        }
                    }}
                >
                    İptal
                </CustomButton>
                <CustomButton
                    type="primary"
                    loading={loading}
                    onClick={onSubmit}
                    sx={{
                        bgcolor: '#1877F2',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#1664D9',
                        }
                    }}
                >
                    Cevapla
                </CustomButton>
            </div>
        </CustomModal>
    );
};

export default DemandAnswerModal; 