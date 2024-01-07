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
    defaultChangePasswordSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getChangePasswordSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getChangePasswordSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getChangePasswordFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultChangePasswordSlice, getChangePasswordSlice, getChangePasswordSuccessSlice, getChangePasswordFailedSlice } = changePasswordSlice.actions;

export const defaultChangePassword = () => {
  return async (dispatch, getState) => {
    dispatch(defaultChangePasswordSlice());
  };
}

export const submitChangePassword = (params) => {
  return async (dispatch, getState) => {
    dispatch(getChangePasswordSlice());
    const token = getState()?.auth?.token;
    return PROFILE.changePassword(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getChangePasswordSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getChangePasswordFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getChangePasswordFailedSlice(data));
      })
  };
}

export default changePasswordSlice.reducer;