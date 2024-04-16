import { createSlice } from "@reduxjs/toolkit";
import { SETTING } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    defaultSettingSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getSettingSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getSettingSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data =  action?.payload;
    },
    getSettingFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultSettingSlice, getSettingSlice, getSettingSuccessSlice, getSettingFailedSlice } = settingSlice.actions;

export const defaultSetting = () => {
  return async (dispatch, getState) => {
    dispatch(defaultSettingSlice());
  };
}

export const getSetting = () => {
  return async (dispatch, getState) => {
    dispatch(getSettingSlice());
    return SETTING.get()
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getSettingSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getSettingFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getSettingFailedSlice(message));
      })
  };
}

export default settingSlice.reducer;