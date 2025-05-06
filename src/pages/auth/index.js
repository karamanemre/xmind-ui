import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Box, Paper } from '@mui/material';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      background: '#EDF0F2'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: 480,
          borderRadius: 3,
          bgcolor: '#FAFBFC',
          py: 4
        }}
      >
        {isLogin ? (
          <LoginForm onSwitchMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchMode={() => setIsLogin(true)} />
        )}
      </Paper>
    </Box>
  );
} 