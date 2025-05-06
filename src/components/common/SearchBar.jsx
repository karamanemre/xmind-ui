import { useState, useEffect } from 'react';
import { CustomTextField } from '@/components/common/CustomInput';
import { Search as SearchIcon } from '@mui/icons-material';
import useDebounce from '@/hooks/useDebounce';

const SearchBar = ({ value, onChange, placeholder = "Ara..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        onChange(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <CustomTextField
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                sx: { height: '40px' }
            }}
            sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                    height: '40px'
                }
            }}
        />
    );
};

export default SearchBar; 