import { createSlice } from "@reduxjs/toolkit";
import { setData } from "./authSlice";
import { PROFILE } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    defaultProfileSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getProfileSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getProfileSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getProfileFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultProfileSlice, getProfileSlice, getProfileSuccessSlice, getProfileFailedSlice } = profileSlice.actions;

export const defaultProfile = () => {
  return async (dispatch, getState) => {
    dispatch(defaultProfileSlice());
  };
}

export const getProfile = () => {
  return async (dispatch, getState) => {
    dispatch(getProfileSlice());
    const token = getState()?.auth?.token;
    return PROFILE.get(token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getProfileSuccessSlice());
          dispatch(setData(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong'
          dispatch(getProfileFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getProfileFailedSlice(message));
      })
  };
}

export default profileSlice.reducer;