import { createSlice } from "@reduxjs/toolkit";
import { BLOCKDOMAIN } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  data: {}
};

export const blockDomainCreateSlice = createSlice({
  name: "blockDomainCreate",
  initialState,
  reducers: {
    defaultBlockDomainCreateSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {};
    },
    getBlockDomainCreateSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainCreateSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainCreateFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultBlockDomainCreateSlice, getBlockDomainCreateSlice, getBlockDomainCreateSuccessSlice, getBlockDomainCreateFailedSlice } = blockDomainCreateSlice.actions;

export const defaultBlockDomainCreate = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBlockDomainCreateSlice());
  };
}

export const createBlockDomain = (params) => {
  return async (dispatch, getState) => {
    dispatch(getBlockDomainCreateSlice());
    const token = getState()?.auth?.token;
    return BLOCKDOMAIN.create(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBlockDomainCreateSuccessSlice());
        } else {
          const result = {
            data: response?.data?.data,
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
          }
          dispatch(getBlockDomainCreateFailedSlice(result));
        }
      })
      .catch((error) => {
        const result = {
          data: error?.response?.data?.data,
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
        }
        dispatch(getBlockDomainCreateFailedSlice(result));
      })
  };
}

export default blockDomainCreateSlice.reducer;