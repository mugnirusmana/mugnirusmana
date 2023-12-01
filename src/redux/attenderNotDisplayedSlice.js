import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const attenderNotDisplayedSlice = createSlice({
  name: "attenderNotDisplayed",
  initialState,
  reducers: {
    defaultAttenderNotDisplayedSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderNotDisplayedSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderNotDisplayedSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderNotDisplayedFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderNotDisplayedSlice, getAttenderNotDisplayedSlice, getAttenderNotDisplayedSuccessSlice, getAttenderNotDisplayedFailedSlice } = attenderNotDisplayedSlice.actions;

export const defaultAttenderNotDisplayed = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderNotDisplayedSlice());
  };
}

export const submitAttenderNotDisplay = (id) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderNotDisplayedSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.notDisplayed(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getAttenderNotDisplayedSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderNotDisplayedFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderNotDisplayedFailedSlice(message));
      })
  };
}

export default attenderNotDisplayedSlice.reducer;