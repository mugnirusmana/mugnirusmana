import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const attenderAttendSlice = createSlice({
  name: "attenderAttend",
  initialState,
  reducers: {
    defaultAttenderAttendSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getAttenderAttendSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderAttendSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getAttenderAttendFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderAttendSlice, getAttenderAttendSlice, getAttenderAttendSuccessSlice, getAttenderAttendFailedSlice } = attenderAttendSlice.actions;

export const defaultAttenderAttend = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderAttendSlice());
  };
}

export const submitAttenderAttend = (dataScan) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderAttendSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.attend(dataScan, token)
      .then((response) => {
        if (response?.data?.meta?.status === 201) {
          dispatch(getAttenderAttendSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderAttendFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderAttendFailedSlice(message));
      })
  };
}

export default attenderAttendSlice.reducer;