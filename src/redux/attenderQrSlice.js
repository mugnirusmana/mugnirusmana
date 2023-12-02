import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const attenderQrSlice = createSlice({
  name: "attenderQr",
  initialState,
  reducers: {
    defaultAttenderQrSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderQrSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderQrSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderQrFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderQrSlice, getAttenderQrSlice, getAttenderQrSuccessSlice, getAttenderQrFailedSlice } = attenderQrSlice.actions;

export const defaultAttenderQr = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderQrSlice());
  };
}

export const regenerateAttenderQr = (id) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderQrSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.regenerateQr(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getAttenderQrSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderQrFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderQrFailedSlice(message));
      })
  };
}

export default attenderQrSlice.reducer;