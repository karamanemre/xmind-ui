import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Box, Container } from '@mui/material';
import { logout } from '../store/features/authSlice';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Hoş Geldiniz
        </Typography>
        <Typography variant="h6" gutterBottom>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Rol: {user?.role === 'ADMIN' ? 'Yönetici' : 'Kullanıcı'}
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => dispatch(logout())}
          sx={{ mt: 2 }}
        >
          Çıkış Yap
        </Button>
      </Box>
    </Container>
  );
}

export default Home; 