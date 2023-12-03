import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const activateAccountValidateSlice = createSlice({
  name: "activateAccountValidate",
  initialState,
  reducers: {
    defaultActivateAccountValidateSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getActivateAccountValidateSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getActivateAccountValidateSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getActivateAccountValidateFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultActivateAccountValidateSlice, getActivateAccountValidateSlice, getActivateAccountValidateSuccessSlice, getActivateAccountValidateFailedSlice } = activateAccountValidateSlice.actions;

export const defaultActivateAccountValidate = () => {
  return async (dispatch, getState) => {
    dispatch(defaultActivateAccountValidateSlice());
  };
}

export const submitActivateAccountValidate = (params) => {
  return async (dispatch, getState) => {
    dispatch(getActivateAccountValidateSlice());
    return AUTH.activateAccountValidate(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getActivateAccountValidateSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getActivateAccountValidateFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getActivateAccountValidateFailedSlice(data));
      })
  };
}

export default activateAccountValidateSlice.reducer;