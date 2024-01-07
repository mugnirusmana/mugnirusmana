import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const broadcastRemoveSlice = createSlice({
  name: "broadcastRemove",
  initialState,
  reducers: {
    defaultBroadcastRemoveSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastRemoveSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastRemoveSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastRemoveFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBroadcastRemoveSlice, getBroadcastRemoveSlice, getBroadcastRemoveSuccessSlice, getBroadcastRemoveFailedSlice } = broadcastRemoveSlice.actions;

export const defaultBroadcastRemove = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastRemoveSlice());
  };
}

export const setBroadcastRemove = (id) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastRemoveSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.remove(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastRemoveSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong'
          dispatch(getBroadcastRemoveFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong'
        dispatch(getBroadcastRemoveFailedSlice(message));
      })
  };
}

export default broadcastRemoveSlice.reducer;