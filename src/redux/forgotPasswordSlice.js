import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    defaultForgotPasswordSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getForgotPasswordSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getForgotPasswordSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getForgotPasswordFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultForgotPasswordSlice, getForgotPasswordSlice, getForgotPasswordSuccessSlice, getForgotPasswordFailedSlice } = forgotPasswordSlice.actions;

export const defaultForgotPassword = () => {
  return async (dispatch, getState) => {
    dispatch(defaultForgotPasswordSlice());
  };
}

export const submitForgotPassword = (params) => {
  return async (dispatch, getState) => {
    dispatch(getForgotPasswordSlice());
    const token = getState()?.auth?.token;
    return AUTH.forgotPassword(params, token)
      .then((response) => {
        console.log('response ', response);
        if (response?.data?.meta?.is_success) {
          dispatch(getForgotPasswordSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getForgotPasswordFailedSlice(data));
        }
      })
      .catch((error) => {
        console.log('error ', error);
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getForgotPasswordFailedSlice(data));
      })
  };
}

export default forgotPasswordSlice.reducer;