import { Typography } from '@mui/material';

const CustomTitle = ({ children, ...props }) => {
  return (
    <Typography
      {...props}
      sx={{
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: '22px',
        lineHeight: '28px',
        letterSpacing: '0px',
        ...props.sx
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomTitle; 