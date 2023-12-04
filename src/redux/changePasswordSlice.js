import { createSlice } from "@reduxjs/toolkit";
import { PROFILE } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    defaultChangePassworddSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getChangePassworddSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getChangePassworddSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getChangePassworddFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultChangePassworddSlice, getChangePassworddSlice, getChangePassworddSuccessSlice, getChangePassworddFailedSlice } = changePasswordSlice.actions;

export const defaultChangePasswordd = () => {
  return async (dispatch, getState) => {
    dispatch(defaultChangePassworddSlice());
  };
}

export const submitChangePasswordd = (params) => {
  return async (dispatch, getState) => {
    dispatch(getChangePassworddSlice());
    const token = getState()?.auth?.token;
    return PROFILE.changePassword(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getChangePassworddSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getChangePassworddFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getChangePassworddFailedSlice(data));
      })
  };
}

export default changePasswordSlice.reducer;