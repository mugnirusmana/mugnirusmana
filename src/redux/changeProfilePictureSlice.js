import { createSlice } from "@reduxjs/toolkit";
import { PROFILE } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const changePorifilePictureSlice = createSlice({
  name: "changePorifilePicture",
  initialState,
  reducers: {
    defaultChangeProfilePictureSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {}
    },
    getChangeProfilePictureSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getChangeProfilePictureSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getChangeProfilePictureFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultChangeProfilePictureSlice, getChangeProfilePictureSlice, getChangeProfilePictureSuccessSlice, getChangeProfilePictureFailedSlice } = changePorifilePictureSlice.actions;

export const defaultChangeProfilePicture = () => {
  return async (dispatch, getState) => {
    dispatch(defaultChangeProfilePictureSlice());
  };
}

export const submitChangeProfilePicture = (params) => {
  return async (dispatch, getState) => {
    dispatch(getChangeProfilePictureSlice());
    const token = getState()?.auth?.token;
    return PROFILE.changePicture(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getChangeProfilePictureSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getChangeProfilePictureFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getChangeProfilePictureFailedSlice(data));
      })
  };
}

export default changePorifilePictureSlice.reducer;