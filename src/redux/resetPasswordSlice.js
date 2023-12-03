import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    defaultResetPasswordSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getResetPasswordSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getResetPasswordSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getResetPasswordFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultResetPasswordSlice, getResetPasswordSlice, getResetPasswordSuccessSlice, getResetPasswordFailedSlice } = resetPasswordSlice.actions;

export const defaultResetPassword = () => {
  return async (dispatch, getState) => {
    dispatch(defaultResetPasswordSlice());
  };
}

export const submitResetPassword = (params) => {
  return async (dispatch, getState) => {
    dispatch(getResetPasswordSlice());
    return AUTH.resetPassword(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getResetPasswordSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getResetPasswordFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getResetPasswordFailedSlice(data));
      })
  };
}

export default resetPasswordSlice.reducer;