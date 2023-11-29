import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const attenderDisplayedSlice = createSlice({
  name: "attenderDisplayed",
  initialState,
  reducers: {
    defaultAttenderDisplayedSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderDisplayedSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderDisplayedSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderDisplayedFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderDisplayedSlice, getAttenderDisplayedSlice, getAttenderDisplayedSuccessSlice, getAttenderDisplayedFailedSlice } = attenderDisplayedSlice.actions;

export const defaultAttenderDisplayed = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderDisplayedSlice());
  };
}

export const submitAttenderDisplay = (id) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderDisplayedSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.displayed(id, token)
      .then((response) => {
        if (response?.data?.meta?.status === 200) {
          dispatch(getAttenderDisplayedSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderDisplayedFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderDisplayedFailedSlice(message));
      })
  };
}

export default attenderDisplayedSlice.reducer;