import { createSlice } from "@reduxjs/toolkit";
import { SETTING } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const settingSaveSlice = createSlice({
  name: "settingSave",
  initialState,
  reducers: {
    defaultSettingSaveSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getSettingSaveSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getSettingSaveSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data =  action?.payload;
    },
    getSettingSaveFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultSettingSaveSlice, getSettingSaveSlice, getSettingSaveSuccessSlice, getSettingSaveFailedSlice } = settingSaveSlice.actions;

export const defaultSettingSave = () => {
  return async (dispatch, getState) => {
    dispatch(defaultSettingSaveSlice());
  };
}

export const submitSetting = (params) => {
  return async (dispatch, getState) => {
    dispatch(getSettingSaveSlice());
    const token = getState()?.auth?.token;
    return SETTING.save(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getSettingSaveSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getSettingSaveFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getSettingSaveFailedSlice(message));
      })
  };
}

export default settingSaveSlice.reducer;