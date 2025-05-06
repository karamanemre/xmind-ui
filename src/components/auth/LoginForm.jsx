'use client';

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
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
    const {t} = useTranslation();
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
                    {t('auth.username')}
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
                    placeholder={t('auth.username')}
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
                    {t('auth.password')}
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
                    placeholder={t('auth.password')}
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

            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                                color: '#666',
                                '&.Mui-checked': {
                                    color: '#1877F2',
                                },
                            }}
                        />
                    }
                    label={t('auth.rememberMe')}
                    sx={{'& .MuiFormControlLabel-label': {fontSize: '0.875rem', color: '#666'}}}
                />
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        // handle forgot password
                    }}
                    sx={{
                        color: '#1877F2',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {t('auth.forgotPassword')}
                </Link>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                    mt: 2,
                    bgcolor: '#1877F2',
                    '&:hover': {
                        bgcolor: '#1464D8',
                    },
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '1rem',
                }}
            >
                {loading ? <CircularProgress size={24} sx={{color: '#fff'}}/> : t('auth.login')}
            </Button>

            <Box sx={{textAlign: 'center', mt: 2}}>
                <Typography variant="body2" sx={{color: '#666'}}>
                    {t('auth.noAccount')}{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={onSwitchMode}
                        sx={{
                            color: '#1877F2',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {t('auth.register')}
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default LoginForm; 