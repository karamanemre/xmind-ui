import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { logout } from '@/store/slices/authSlice';
import LanguageSelector from "@/components/common/LanguageSelector";

const Navbar = ({ onSidebarToggle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#fff',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2, color: '#666' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: '#1877F2',
            fontWeight: 'bold',
            letterSpacing: 1
          }}
        >
          <span style={{ color: '#1877F2' }}>x</span>
          <span style={{ color: '#1877F2', fontWeight: 'bold' }}>MIND</span>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSelector />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: '#666', ml: 1 }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: '#1877F2',
                fontSize: '0.875rem'
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                width: 200,
                '& .MuiMenuItem-root': {
                  py: 1
                }
              }
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" sx={{ color: '#666' }} />
              </ListItemIcon>
              {t('common.settings')}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: '#FF5777' }} />
              </ListItemIcon>
              {t('common.logout')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 