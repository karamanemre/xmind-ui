'use client';

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography
} from '@mui/material';
import {Lock, Person, Visibility, VisibilityOff} from '@mui/icons-material';
import {login} from '@/store/slices/authSlice';
import {useRouter} from 'next/navigation';
import {ADMIN_ROLE, USER_ROLE} from "@/utils/constants";

function LoginForm({onSwitchMode}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(login(formData)).unwrap();
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
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
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
                    Şifre
                </Typography>
                <TextField
                    required
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
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

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                                color: '#1877F2',
                                '&.Mui-checked': {
                                    color: '#1877F2',
                                }
                            }}
                        />
                    }
                    label={
                        <Typography sx={{fontSize: '0.875rem', color: '#666'}}>
                            Beni Hatırla
                        </Typography>
                    }
                />
                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        color: '#666',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#1877F2'
                        }
                    }}
                >
                    Şifremi Unuttum
                </Link>
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
                    'GİRİŞ'
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
                    Hesabınız yok mu?
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
                    Kayıt Ol
                </Button>
            </Box>
        </Box>
    );
}

export default LoginForm; 