import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const attenderRemoveSlice = createSlice({
  name: "attenderRemove",
  initialState,
  reducers: {
    defaultAttenderRemoveSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderRemoveSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderRemoveSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderRemoveFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderRemoveSlice, getAttenderRemoveSlice, getAttenderRemoveSuccessSlice, getAttenderRemoveFailedSlice } = attenderRemoveSlice.actions;

export const defaultAttenderRemove = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderRemoveSlice());
  };
}

export const removeAttender = (id) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderRemoveSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.remove(id, token)
      .then((response) => {
        if (response?.data?.meta?.status === 200) {
          dispatch(getAttenderRemoveSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderRemoveFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderRemoveFailedSlice(message));
      })
  };
}

export default attenderRemoveSlice.reducer;