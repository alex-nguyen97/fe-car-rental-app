import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const [carFilterOption, setCarFilterOption] = useState('none');

  const handleChange = (event) => {
    setCarFilterOption(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
      <Autocomplete
        disablePortal
        options={[]}
        sx={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} placeholder="What are you looking for?" />
        )}
      />
      <Select
        id="car-options"
        value={carFilterOption}
        sx={{ width: 100 }}
        onChange={handleChange}
        placeholder="Car Type"
        style={{
          marginLeft: '10px',
          backgroundColor: 'white',
        }}
      >
        <MenuItem value={'none'}>None</MenuItem>
        <MenuItem value={'name'}>Name</MenuItem>
        <MenuItem value={'type'}>Type</MenuItem>
        <MenuItem value={'brand'}>Brand</MenuItem>
      </Select>
    </div>
  );
};

export default SearchBar;
