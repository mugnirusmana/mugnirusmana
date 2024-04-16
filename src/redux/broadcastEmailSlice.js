import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const broadcastEmailSlice = createSlice({
  name: "broadcastEmail",
  initialState,
  reducers: {
    defaultBroadcastEmailSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastEmailSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastEmailSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastEmailFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBroadcastEmailSlice, getBroadcastEmailSlice, getBroadcastEmailSuccessSlice, getBroadcastEmailFailedSlice } = broadcastEmailSlice.actions;

export const defaultBroadcastEmail = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastEmailSlice());
  };
}

export const sendToEmail = (id) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastEmailSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.sentToEmail(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastEmailSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong'
          dispatch(getBroadcastEmailFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong'
        dispatch(getBroadcastEmailFailedSlice(message));
      })
  };
}

export default broadcastEmailSlice.reducer;