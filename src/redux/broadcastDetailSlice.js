import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  data: {}
};

export const broadcastDetailSlice = createSlice({
  name: "broadcastDetail",
  initialState,
  reducers: {
    defaultBroadcastDetailSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastDetailSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastDetailSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getBroadcastDetailFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBroadcastDetailSlice, getBroadcastDetailSlice, getBroadcastDetailSuccessSlice, getBroadcastDetailFailedSlice } = broadcastDetailSlice.actions;

export const defaultBroadcastDetail = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastDetailSlice());
  };
}

export const getBroadcastDetail = (id) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastDetailSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.detail(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastDetailSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getBroadcastDetailFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getBroadcastDetailFailedSlice(message));
      })
  };
}

export default broadcastDetailSlice.reducer;