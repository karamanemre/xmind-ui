import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Box
} from '@mui/material';
import {
  Category as CategoryIcon,
  ExpandLess,
  ExpandMore,
  Folder as FolderIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useState } from 'react';

const drawerWidth = 240;

const categories = [
  { id: 1, name: 'Örnek Kategori 1' },
  { id: 2, name: 'Örnek Kategori 2' },
];

const Sidebar = ({ open }) => {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#FAFBFC',
          borderRight: '1px solid #E5E7EB',
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon sx={{ color: '#1877F2' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Dashboard" 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: 500,
                    color: '#1C2536'
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleCategoryClick}>
              <ListItemIcon>
                <CategoryIcon sx={{ color: '#1877F2' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Kategoriler" 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: 500,
                    color: '#1C2536'
                  } 
                }} 
              />
              {categoryOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((category) => (
                <ListItemButton 
                  key={category.id}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <FolderIcon sx={{ color: '#1877F2' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.name}
                    sx={{ 
                      '& .MuiTypography-root': { 
                        color: '#1C2536'
                      } 
                    }} 
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#1877F2' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Ayarlar" 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: 500,
                    color: '#1C2536'
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 