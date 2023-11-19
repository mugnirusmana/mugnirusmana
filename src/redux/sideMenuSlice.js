import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: true,
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    sideMenu: (state, action) => {
      state.show = action?.payload
    }
  },
});

export const { sideMenu } = sideMenuSlice.actions;

export const setSideMenu = (status) => {
  return async (dispatch, getState) => {
    dispatch(sideMenu(status));
  };
};

export default sideMenuSlice.reducer;