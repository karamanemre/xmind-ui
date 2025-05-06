import { Box, Typography, Chip } from '@mui/material';
import CustomModal from '../common/CustomModal';
import { useEffect } from 'react';
import { fetchDemands, fetchDemandsById } from '@/store/slices/demandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const statusColors = {
  OPEN: 'info',
  ANSWERED: 'warning',
  CLOSED: 'success'
};

const DemandDetailModal = ({ demand, open, onClose, categories, statuses }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {demand: demandDetail} = useSelector((state) => state.demand);

  useEffect(() => {
    if (demand?.id) {
      dispatch(fetchDemandsById(demand.id));
    }
  }, [demand, dispatch]);

  if (!demand || !demandDetail) return null;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={t('demand.demandDetail')}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">{demandDetail.title}</Typography>
        <Chip 
          label={statuses.find(s => s.key === demandDetail.status)?.desc} 
          color={statusColors[demandDetail.status]}
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
      <Typography sx={{ mb: 2 }}>{demandDetail.description}</Typography>
      <Typography variant="caption" color="text.secondary">
        {t('common.category')}: {categories.find(c => c.key === demandDetail.status)?.desc}
      </Typography>
      {demandDetail.answer && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('common.answer')}:</Typography>
          <Typography>{demandDetail.answer.answerText}</Typography>
        </Box>
      )}
    </CustomModal>
  );
};

export default DemandDetailModal; 