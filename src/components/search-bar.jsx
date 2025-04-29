import { React, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [carFilterOption, setCarFilterOption] = useState('none');
  const [searchValue, setSearchValue] = useState(null);

  const carList = useSelector((state) => {
    return state.store.carList;
  });

  const transformedCarList = useMemo(() => {
    return carList.map((car) => ({
      label: `${car.vehicle_category} - ${car.brand} - ${car.model}`,
      key: car.vin_id,
    }));
  }, [carList]);

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    setSearchOptions(transformedCarList);
  }, [transformedCarList]);

  const getDistinctOptions = (options) => {
    const distinctOptions = options.filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.label === option.label)
    );
    return distinctOptions;
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setCarFilterOption(filterValue);
    setSearchValue(null);
    switch (filterValue) {
      case 'none':
        setSearchOptions(transformedCarList);
        break;
      case 'name':
        const nameOptions = carList.map((car) => {
          return {
            label: car.vehicle_category,
            key: car.vehicle_category,
          };
        });
        const distinctNameOptions = getDistinctOptions(nameOptions);
        setSearchOptions(distinctNameOptions);
        break;
      case 'type':
        const typeOptions = carList.map((car) => {
          return {
            label: car.car_type,
            key: car.car_type,
          };
        });
        const distinctTypeOptions = getDistinctOptions(typeOptions);
        setSearchOptions(distinctTypeOptions);
        break;
      case 'brand':
        const brandOptions = carList.map((car) => {
          return {
            label: car.brand,
            key: car.brand,
          };
        });
        const distinctBrandOptions = getDistinctOptions(brandOptions);
        setSearchOptions(distinctBrandOptions);
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
      <Autocomplete
        disablePortal
        value={searchValue}
        options={searchOptions}
        getOptionKey={(option) => option.key}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          setSearchValue(newValue);
        }}
        sx={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} placeholder="What are you looking for?" />
        )}
      />
      <Select
        id="car-options"
        value={carFilterOption}
        sx={{ width: 100 }}
        onChange={handleFilterChange}
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
