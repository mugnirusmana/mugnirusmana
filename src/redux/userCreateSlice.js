import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const userCreateSlice = createSlice({
  name: "userCreate",
  initialState,
  reducers: {
    defaultUserCreateSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getUserCreateSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserCreateSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserCreateFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultUserCreateSlice, getUserCreateSlice, getUserCreateSuccessSlice, getUserCreateFailedSlice } = userCreateSlice.actions;

export const defaultUserCreate = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserCreateSlice());
  };
}

export const submitUserCreate = (params) => {
  return async (dispatch, getState) => {
    dispatch(getUserCreateSlice());
    const token = getState()?.auth?.token;
    return USER.create(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUserCreateSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getUserCreateFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getUserCreateFailedSlice(data));
      })
  };
}

export default userCreateSlice.reducer;