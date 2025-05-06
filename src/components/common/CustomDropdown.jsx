import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import { CustomSelect } from './CustomInput';

const CustomDropdown = ({ 
  label, 
  value, 
  onChange, 
  onBlur, 
  options, 
  error, 
  helperText,
  name,
  ...props 
}) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel 
        sx={{ 
          background: '#fff',
          px: 1,
          transform: 'translate(16px, -9px) scale(0.75)',
          '&.Mui-focused': {
            transform: 'translate(16px, -9px) scale(0.75)',
          }
        }}
      >
        {label}
      </InputLabel>
      <CustomSelect
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        sx={{
          height: '40px',
          '& .MuiSelect-select': {
            height: '50px !important',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px !important'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '12px'
          }
        }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            sx={{
              height: '40px',
              padding: '0 16px',
              '&:hover': {
                bgcolor: '#F5F8FF'
              },
              '&.Mui-selected': {
                bgcolor: '#EBF1FF',
                '&:hover': {
                  bgcolor: '#E3EBFF'
                }
              }
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
      {error && helperText && (
        <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default CustomDropdown; 