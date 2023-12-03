import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "./../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const activateAccountSlice = createSlice({
  name: "activateAccount",
  initialState,
  reducers: {
    defaultActivateAccountSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getActivateAccountSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getActivateAccountSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getActivateAccountFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultActivateAccountSlice, getActivateAccountSlice, getActivateAccountSuccessSlice, getActivateAccountFailedSlice } = activateAccountSlice.actions;

export const defaultActivateAccount = () => {
  return async (dispatch, getState) => {
    dispatch(defaultActivateAccountSlice());
  };
}

export const submitActivateAccount = (params) => {
  return async (dispatch, getState) => {
    dispatch(getActivateAccountSlice());
    const token = getState()?.auth?.token;
    return AUTH.activateAccount(params, token)
      .then((response) => {
        console.log('response ', response);
        if (response?.data?.meta?.is_success) {
          dispatch(getActivateAccountSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getActivateAccountFailedSlice(data));
        }
      })
      .catch((error) => {
        console.log('error ', error);
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getActivateAccountFailedSlice(data));
      })
  };
}

export default activateAccountSlice.reducer;