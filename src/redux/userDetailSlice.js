import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  data: {}
};

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    defaultUserDetailSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDetailSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDetailSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getUserDetailFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserDetailSlice, getUserDetailSlice, getUserDetailSuccessSlice, getUserDetailFailedSlice } = userDetailSlice.actions;

export const defaultUserDetail = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserDetailSlice());
  };
}

export const getUserDetail = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserDetailSlice());
    const token = getState()?.auth?.token;
    return USER.detail(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserDetailSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserDetailFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserDetailFailedSlice(message));
      })
  };
}

export default userDetailSlice.reducer;