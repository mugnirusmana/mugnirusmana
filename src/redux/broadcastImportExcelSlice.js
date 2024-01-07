import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  data: {}
};

export const broadcastImportExcelSlice = createSlice({
  name: "broadcastImportExcel",
  initialState,
  reducers: {
    defaultBroadcastImportExcelSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {};
    },
    getBroadcastImportExcelSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastImportExcelSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastImportExcelFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultBroadcastImportExcelSlice, getBroadcastImportExcelSlice, getBroadcastImportExcelSuccessSlice, getBroadcastImportExcelFailedSlice } = broadcastImportExcelSlice.actions;

export const defaultBroadcastImportExcel = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastImportExcelSlice());
  };
}

export const submitBroadcastImportExcel = (params) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastImportExcelSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.importExcel(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastImportExcelSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getBroadcastImportExcelFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getBroadcastImportExcelFailedSlice(data));
      })
  };
}

export default broadcastImportExcelSlice.reducer;