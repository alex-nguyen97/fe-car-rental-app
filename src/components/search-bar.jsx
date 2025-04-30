import { React, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchFilter, setSearchValue } from '../storeSlice';
import { fetchCarsData } from '../utils/api';

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchFilter = useSelector((state) => {
    return state.store.searchFilter;
  });

  const searchValue = useSelector((state) => {
    return state.store.searchValue;
  });

  const carOptions = useSelector((state) => {
    return state.store.carOptions;
  });

  const transformedCarOptions = useMemo(() => {
    return carOptions.map((car) => ({
      label: `${car.vehicle_category} - ${car.brand} - ${car.model}`,
      key: car.vin_id,
    }));
  }, [carOptions]);

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    setSearchOptions(transformedCarOptions);
  }, [transformedCarOptions]);

  const getDistinctOptions = (options) => {
    const distinctOptions = options.filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.label === option.label)
    );
    return distinctOptions;
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    dispatch(setSearchFilter(filterValue));
    // Reset search value when filter changes
    dispatch(setSearchValue(null));
    switch (filterValue) {
      case 'none':
        setSearchOptions(transformedCarOptions);
        break;
      case 'name':
        const nameOptions = carOptions.map((car) => {
          return {
            label: car.vehicle_category,
            key: car.vehicle_category,
          };
        });
        const distinctNameOptions = getDistinctOptions(nameOptions);
        setSearchOptions(distinctNameOptions);
        break;
      case 'type':
        const typeOptions = carOptions.map((car) => {
          return {
            label: car.car_type,
            key: car.car_type,
          };
        });
        const distinctTypeOptions = getDistinctOptions(typeOptions);
        setSearchOptions(distinctTypeOptions);
        break;
      case 'brand':
        const brandOptions = carOptions.map((car) => {
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
          dispatch(setSearchValue(newValue));
        }}
        sx={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} placeholder="What are you looking for?" />
        )}
      />
      <Select
        id="car-options"
        value={searchFilter}
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
