import { Box, Typography, Chip } from '@mui/material';
import CustomModal from '../common/CustomModal';

const statusColors = {
  OPEN: 'info',
  ANSWERED: 'warning',
  CLOSED: 'success'
};

const DemandDetailModal = ({ demand, open, onClose, categories, statuses }) => {
  if (!demand) return null;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Talep Detayı"
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">{demand.title}</Typography>
        <Chip 
          label={statuses.find(s => s.key === demand.status)?.desc} 
          color={statusColors[demand.status]}
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
      <Typography sx={{ mb: 2 }}>{demand.description}</Typography>
      <Typography variant="caption" color="text.secondary">
        Kategori: {categories.find(c => c.key === demand.categoryKey)?.desc}
      </Typography>
      {demand.adminResponse && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Yanıt:</Typography>
          <Typography>{demand.adminResponse}</Typography>
        </Box>
      )}
    </CustomModal>
  );
};

export default DemandDetailModal; 