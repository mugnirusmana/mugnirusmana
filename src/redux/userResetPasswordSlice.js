import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const userResetPasswordSlice = createSlice({
  name: "userResetPassword",
  initialState,
  reducers: {
    defaultUserResetPasswordSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserResetPasswordSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserResetPasswordSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserResetPasswordFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserResetPasswordSlice, getUserResetPasswordSlice, getUserResetPasswordSuccessSlice, getUserResetPasswordFailedSlice } = userResetPasswordSlice.actions;

export const defaultUserResetPassword = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserResetPasswordSlice());
  };
}

export const setUserResetPassword = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserResetPasswordSlice());
    const token = getState()?.auth?.token;
    return USER.resetPassword(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserResetPasswordSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserResetPasswordFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserResetPasswordFailedSlice(message));
      })
  };
}

export default userResetPasswordSlice.reducer;