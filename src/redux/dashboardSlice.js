import { createSlice } from "@reduxjs/toolkit";
import { DASHBOARD } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    defaultDashboardSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getDashboardSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getDashboardSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getDashboardFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultDashboardSlice, getDashboardSlice, getDashboardSuccessSlice, getDashboardFailedSlice } = dashboardSlice.actions;

export const defaultDashboard = () => {
  return async (dispatch, getState) => {
    dispatch(defaultDashboardSlice());
  };
}

export const getDashboard = () => {
  return async (dispatch, getState) => {
    dispatch(getDashboardSlice());
    const token = getState()?.auth?.token;
    return DASHBOARD.summary(token)
      .then((response) => {
        if (response?.data?.meta?.status === 200) {
          dispatch(getDashboardSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getDashboardFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getDashboardFailedSlice(message));
      })
  };
}

export default dashboardSlice.reducer;