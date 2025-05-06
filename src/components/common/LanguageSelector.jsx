import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={Boolean(anchorEl) ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => changeLanguage('tr')}>Türkçe</MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector; 