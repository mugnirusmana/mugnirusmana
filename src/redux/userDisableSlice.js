import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const userDisableSlice = createSlice({
  name: "userDisable",
  initialState,
  reducers: {
    defaultUserDisableSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDisableSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDisableSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDisableFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserDisableSlice, getUserDisableSlice, getUserDisableSuccessSlice, getUserDisableFailedSlice } = userDisableSlice.actions;

export const defaultUserDisable = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserDisableSlice());
  };
}

export const setUserDisable = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserDisableSlice());
    const token = getState()?.auth?.token;
    return USER.disable(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserDisableSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserDisableFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserDisableFailedSlice(message));
      })
  };
}

export default userDisableSlice.reducer;