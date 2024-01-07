import { createSlice } from "@reduxjs/toolkit";
import { PROFILE } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    defaultUpdateProfileSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getUpdateProfileSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUpdateProfileSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getUpdateProfileFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultUpdateProfileSlice, getUpdateProfileSlice, getUpdateProfileSuccessSlice, getUpdateProfileFailedSlice } = updateProfileSlice.actions;

export const defaultUpdateProfile = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUpdateProfileSlice());
  };
}

export const submitUpdateProfile = (params) => {
  return async (dispatch, getState) => {
    dispatch(getUpdateProfileSlice());
    const token = getState()?.auth?.token;
    return PROFILE.update(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getUpdateProfileSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getUpdateProfileFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getUpdateProfileFailedSlice(data));
      })
  };
}

export default updateProfileSlice.reducer;