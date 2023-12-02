import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const attenderDetailSlice = createSlice({
  name: "attenderDetail",
  initialState,
  reducers: {
    defaultAttenderDetailSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderDetailSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderDetailSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data =  action?.payload;
    },
    getAttenderDetailFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderDetailSlice, getAttenderDetailSlice, getAttenderDetailSuccessSlice, getAttenderDetailFailedSlice } = attenderDetailSlice.actions;

export const defaultAttenderDetail = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderDetailSlice());
  };
}

export const getAttenderDetail = (id) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderDetailSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.getDetail(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getAttenderDetailSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderDetailFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderDetailFailedSlice(message));
      })
  };
}

export default attenderDetailSlice.reducer;