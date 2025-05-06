import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CustomTitle from './CustomTitle';

const CustomModal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  maxWidth = 'sm',
  ...props 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px'
        }
      }}
      {...props}
    >
      <DialogTitle>
        <CustomTitle>{title}</CustomTitle>
        <IconButton
          onClick={onClose}
          sx={{ 
            position: 'absolute', 
            right: 8, 
            top: 8,
            bgcolor: '#FF5777',
            width: '24px',
            height: '24px',
            '&:hover': {
              bgcolor: '#FF5777',
              opacity: 0.9
            },
            '& .MuiSvgIcon-root': {
              color: '#fff',
              fontSize: '16px'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal; 