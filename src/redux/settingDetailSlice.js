import { createSlice } from "@reduxjs/toolkit";
import { SETTING } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const settingDetailSlice = createSlice({
  name: "settingDetail",
  initialState,
  reducers: {
    defaultSettingDetailSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getSettingDetailSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getSettingDetailSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data =  action?.payload;
    },
    getSettingDetailFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultSettingDetailSlice, getSettingDetailSlice, getSettingDetailSuccessSlice, getSettingDetailFailedSlice } = settingDetailSlice.actions;

export const defaultSettingDetail = () => {
  return async (dispatch, getState) => {
    dispatch(defaultSettingDetailSlice());
  };
}

export const getDetail = () => {
  return async (dispatch, getState) => {
    dispatch(getSettingDetailSlice());
    const token = getState()?.auth?.token;
    return SETTING.detail(token)
      .then((response) => {
        if (response?.data?.meta?.status === 200) {
          dispatch(getSettingDetailSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getSettingDetailFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getSettingDetailFailedSlice(message));
      })
  };
}

export default settingDetailSlice.reducer;