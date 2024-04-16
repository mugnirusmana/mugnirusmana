import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const userActiveSlice = createSlice({
  name: "userActive",
  initialState,
  reducers: {
    defaultUserActiveSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserActiveSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserActiveSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserActiveFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserActiveSlice, getUserActiveSlice, getUserActiveSuccessSlice, getUserActiveFailedSlice } = userActiveSlice.actions;

export const defaultUserActive = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserActiveSlice());
  };
}

export const setUserActive = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserActiveSlice());
    const token = getState()?.auth?.token;
    return USER.active(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserActiveSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserActiveFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserActiveFailedSlice(message));
      })
  };
}

export default userActiveSlice.reducer;