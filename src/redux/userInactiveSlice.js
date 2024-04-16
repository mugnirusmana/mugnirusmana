import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const userInactiveSlice = createSlice({
  name: "userInactive",
  initialState,
  reducers: {
    defaultUserInactiveSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserInactiveSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserInactiveSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserInactiveFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserInactiveSlice, getUserInactiveSlice, getUserInactiveSuccessSlice, getUserInactiveFailedSlice } = userInactiveSlice.actions;

export const defaultUserInactive = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserInactiveSlice());
  };
}

export const setUserInactive = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserInactiveSlice());
    const token = getState()?.auth?.token;
    return USER.inactive(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserInactiveSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserInactiveFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserInactiveFailedSlice(message));
      })
  };
}

export default userInactiveSlice.reducer;