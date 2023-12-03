import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "./authSlice";
import { AUTH } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const loginNoPassValidateSlice = createSlice({
  name: "loginNoPassValidate",
  initialState,
  reducers: {
    defaultLoginNoPassValidateSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getLoginNoPassValidateSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getLoginNoPassValidateSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getLoginNoPassValidateFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultLoginNoPassValidateSlice, getLoginNoPassValidateSlice, getLoginNoPassValidateSuccessSlice, getLoginNoPassValidateFailedSlice } = loginNoPassValidateSlice.actions;

export const defaultLoginNoPassValidate = () => {
  return async (dispatch, getState) => {
    dispatch(defaultLoginNoPassValidateSlice());
  };
}

export const submitLoginNoPassValidate = (params, width, desktopSize) => {
  return async (dispatch, getState) => {
    dispatch(getLoginNoPassValidateSlice());
    return AUTH.loginNoPassValidate(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getLoginNoPassValidateSuccessSlice());
          const data = {
            token: response?.data?.data?.access_token,
            data: response?.data?.data
          }
          dispatch(setToken(data, width, desktopSize));
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getLoginNoPassValidateFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getLoginNoPassValidateFailedSlice(data));
      })
  };
}

export default loginNoPassValidateSlice.reducer;