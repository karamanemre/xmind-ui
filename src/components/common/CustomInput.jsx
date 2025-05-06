import { TextField, Select, styled } from '@mui/material';

const commonStyles = {
  '& .MuiInputBase-root': {
    height: 40,
    borderRadius: '12px',
    padding: '16px',
    gap: '10px',
    borderWidth: '1px',
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: '1px',
        borderColor: '#E5E7EB',
      },
      '&:hover fieldset': {
        borderColor: '#1877F2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1877F2',
      },
    },
  },
  '& .MuiInputBase-input': {
    padding: '0',
    '&::placeholder': {
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    transform: 'translate(16px, -9px) scale(0.75)',
    background: '#fff',
    padding: '0 8px',
    '&.MuiFormLabel-filled, &.Mui-focused': {
      transform: 'translate(16px, -9px) scale(0.75)',
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '4px',
  },
};

export const CustomTextField = styled(TextField)({
  ...commonStyles,
  '& .MuiInputBase-root': {
    ...commonStyles['& .MuiInputBase-root'],
    height: props => props.multiline ? 'auto' : 50,
    minHeight: props => props.multiline ? 120 : 50,
  },
});

export const CustomSelect = styled(Select)({
  ...commonStyles,
  '& .MuiSelect-select': {
    padding: '0 !important',
  },
}); 