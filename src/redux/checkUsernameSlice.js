import { createSlice } from "@reduxjs/toolkit";
import { PROFILE } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const checkUsernameSlice = createSlice({
  name: "checkUsername",
  initialState,
  reducers: {
    defaultCheckUsernameSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getCheckUsernameSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getCheckUsernameSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getCheckUsernameFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultCheckUsernameSlice, getCheckUsernameSlice, getCheckUsernameSuccessSlice, getCheckUsernameFailedSlice } = checkUsernameSlice.actions;

export const defaultCheckUsername = () => {
  return async (dispatch, getState) => {
    dispatch(defaultCheckUsernameSlice());
  };
}

export const submitCheckUsername = (params) => {
  return async (dispatch, getState) => {
    dispatch(getCheckUsernameSlice());
    const token = getState()?.auth?.token;
    return PROFILE.checkUsername(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getCheckUsernameSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getCheckUsernameFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getCheckUsernameFailedSlice(data));
      })
  };
}

export default checkUsernameSlice.reducer;