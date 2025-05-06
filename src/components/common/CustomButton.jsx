import { Button } from '@mui/material';

const CustomButton = ({ children, variant = 'contained', ...props }) => {
  return (
    <Button
      variant={variant}
      {...props}
      sx={{
        width: '100%',
        height: 50,
        borderRadius: '12px',
        gap: '8px',
        borderWidth: '1px',
        padding: '12px 24px',
        ...props.sx
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton; 