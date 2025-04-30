import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carList: [],
  carOptions: [],
  selectedCar: null,
  searchFilter: 'none',
  searchValue: null,
};

const storeSlice = createSlice({
  name: 'carRental',
  initialState,
  reducers: {
    setCarList: (state, action) => {
      state.carList = action.payload;
    },
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    setCarOptions: (state, action) => {
      state.carOptions = action.payload;
    },
    setSearchValue: (state, action) => {
      const searchValue = action.payload;
      state.searchValue = searchValue;

      const searchFilter = state.searchFilter;
      const carOptions = state.carOptions;

      if (searchValue) {
        switch (searchFilter) {
          case 'none':
            state.carList = carOptions.filter((car) =>
              car.vin_id.toLowerCase().includes(searchValue.key.toLowerCase())
            );
            break;
          case 'name':
            const nameOptions = carOptions.filter((car) =>
              car.vehicle_category
                .toLowerCase()
                .includes(searchValue.key.toLowerCase())
            );
            state.carList = nameOptions;
            break;
          case 'type':
            const typeOptions = carOptions.filter((car) =>
              car.car_type.toLowerCase().includes(searchValue.key.toLowerCase())
            );
            state.carList = typeOptions;
            break;
          case 'brand':
            const brandOptions = carOptions.filter((car) =>
              car.brand.toLowerCase().includes(searchValue.key.toLowerCase())
            );
            state.carList = brandOptions;
            break;
          default:
            break;
        }
      } else {
        state.carList = carOptions;
      }
    },
  },
});

export const {
  setSelectedCar,
  setCarList,
  setSearchFilter,
  setSearchValue,
  setCarOptions,
} = storeSlice.actions;
export default storeSlice.reducer;
