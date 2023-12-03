import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const loginNoPassSlice = createSlice({
  name: "loginNoPass",
  initialState,
  reducers: {
    defaultLoginNoPassSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getLoginNoPassSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getLoginNoPassSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getLoginNoPassFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultLoginNoPassSlice, getLoginNoPassSlice, getLoginNoPassSuccessSlice, getLoginNoPassFailedSlice } = loginNoPassSlice.actions;

export const defaultLoginNoPass = () => {
  return async (dispatch, getState) => {
    dispatch(defaultLoginNoPassSlice());
  };
}

export const submitLoginNoPass = (params) => {
  return async (dispatch, getState) => {
    dispatch(getLoginNoPassSlice());
    return AUTH.loginNoPass(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getLoginNoPassSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getLoginNoPassFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getLoginNoPassFailedSlice(data));
      })
  };
}

export default loginNoPassSlice.reducer;