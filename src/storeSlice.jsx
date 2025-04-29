import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carList: [],
  selectedCar: null,
  searchOption: null,
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
  },
});

export const { setSelectedCar, setCarList } = storeSlice.actions;
export default storeSlice.reducer;
