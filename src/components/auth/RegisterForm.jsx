'use client';

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography,} from '@mui/material';
import {Email, Lock, Person, Visibility, VisibilityOff} from '@mui/icons-material';
import {register} from '@/store/slices/authSlice';
import {useRouter} from 'next/navigation';
import {ADMIN_ROLE, USER_ROLE} from "@/utils/constants";

function RegisterForm({onSwitchMode}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            dispatch({type: 'auth/setError', payload: 'Şifreler eşleşmiyor'});
            return;
        }

        try {
            const registerData = {
                email: formData.email,
                password: formData.password,
                passwordRepeat: formData.confirmPassword
            };
            const result = await dispatch(register(registerData)).unwrap();
            if (result.roles && result.roles.includes(USER_ROLE)) {
                router.push('/demand');
            } else if (result.roles && result.roles.includes(ADMIN_ROLE)) {
                router.push('/demand-answer');
            }
        } catch (error) {

        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                px: 4
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{
                    mb: 4,
                    color: '#1877F2',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    fontSize: '2rem'
                }}
            >
                <span style={{color: '#1877F2'}}>x</span>
                <span style={{color: '#1877F2', fontWeight: 'bold'}}>MIND</span>
            </Typography>

            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}

            <Box sx={{position: 'relative', mt: 2}}>
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: -8,
                        left: 0,
                        bgcolor: '#FAFBFC',
                        px: 1,
                        color: '#666',
                        fontSize: '0.75rem',
                        zIndex: 1
                    }}
                >
                    Kullanıcı adı
                </Typography>
                <TextField
                    required
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Kullanıcı adı"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person sx={{color: '#666'}}/>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 1.5,
                            bgcolor: '#FAFBFC',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ddd',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '& .MuiOutlinedInput-input': {
                                position: 'relative',
                                zIndex: 0
                            }
                        }
                    }}
                />
            </Box>

            <Box sx={{position: 'relative'}}>
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: -8,
                        left: 0,
                        bgcolor: '#FAFBFC',
                        px: 1,
                        color: '#666',
                        fontSize: '0.75rem',
                        zIndex: 1
                    }}
                >
                    E-posta
                </Typography>
                <TextField
                    required
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="E-posta"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email sx={{color: '#666'}}/>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 1.5,
                            bgcolor: '#FAFBFC',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ddd',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '& .MuiOutlinedInput-input': {
                                position: 'relative',
                                zIndex: 0
                            }
                        }
                    }}
                />
            </Box>

            <Box sx={{position: 'relative'}}>
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: -8,
                        left: 0,
                        bgcolor: '#FAFBFC',
                        px: 1,
                        color: '#666',
                        fontSize: '0.75rem',
                        zIndex: 1
                    }}
                >
                    Şifre
                </Typography>
                <TextField
                    required
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Şifre"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{color: '#666'}}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff sx={{color: '#666'}}/> :
                                        <Visibility sx={{color: '#666'}}/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 1.5,
                            bgcolor: '#FAFBFC',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ddd',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '& .MuiOutlinedInput-input': {
                                position: 'relative',
                                zIndex: 0
                            }
                        }
                    }}
                />
            </Box>

            <Box sx={{position: 'relative'}}>
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: -8,
                        left: 0,
                        bgcolor: '#FAFBFC',
                        px: 1,
                        color: '#666',
                        fontSize: '0.75rem',
                        zIndex: 1
                    }}
                >
                    Şifre Tekrar
                </Typography>
                <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Şifre Tekrar"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{color: '#666'}}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff sx={{color: '#666'}}/> :
                                        <Visibility sx={{color: '#666'}}/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 1.5,
                            bgcolor: '#FAFBFC',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ddd',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1877F2',
                            },
                            '& .MuiOutlinedInput-input': {
                                position: 'relative',
                                zIndex: 0
                            }
                        }
                    }}
                />
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                    mt: 1,
                    height: '36px',
                    minHeight: '36px',
                    bgcolor: '#1877F2',
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                        bgcolor: '#1664D9'
                    }
                }}
            >
                {loading ? (
                    <CircularProgress size={20} color="inherit"/>
                ) : (
                    'KAYIT OL'
                )}
            </Button>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                mt: 2
            }}>
                <Typography sx={{fontSize: '0.875rem', color: '#666'}}>
                    Zaten hesabınız var mı?
                </Typography>
                <Button
                    onClick={onSwitchMode}
                    sx={{
                        color: '#1877F2',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        minWidth: 'auto',
                        p: 0,
                        '&:hover': {
                            background: 'none',
                            color: '#1664D9'
                        }
                    }}
                >
                    Giriş Yap
                </Button>
            </Box>
        </Box>
    );
}

export default RegisterForm; 