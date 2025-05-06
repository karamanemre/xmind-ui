import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Box, Container } from '@mui/material';
import { logout } from '../store/features/authSlice';
import { useTranslation } from 'react-i18next';

function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {t('common.welcome')}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {t('common.role')}: {user?.role === 'ADMIN' ? t('common.admin') : t('common.user')}
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => dispatch(logout())}
          sx={{ mt: 2 }}
        >
          {t('common.logout')}
        </Button>
      </Box>
    </Container>
  );
}

export default Home; 