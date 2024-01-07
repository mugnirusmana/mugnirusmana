import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  reducers: {
    defaultUserDeleteSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDeleteSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDeleteSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserDeleteFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserDeleteSlice, getUserDeleteSlice, getUserDeleteSuccessSlice, getUserDeleteFailedSlice } = userDeleteSlice.actions;

export const defaultUserDelete = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserDeleteSlice());
  };
}

export const setUserDelete = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserDeleteSlice());
    const token = getState()?.auth?.token;
    return USER.remove(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserDeleteSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserDeleteFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserDeleteFailedSlice(message));
      })
  };
}

export default userDeleteSlice.reducer;