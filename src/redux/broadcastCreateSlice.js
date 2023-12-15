import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  data: {}
};

export const broadcastCreateSlice = createSlice({
  name: "broadcastCreate",
  initialState,
  reducers: {
    defaultBroadcastCreateSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {};
    },
    getBroadcastCreateSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastCreateSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastCreateFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultBroadcastCreateSlice, getBroadcastCreateSlice, getBroadcastCreateSuccessSlice, getBroadcastCreateFailedSlice } = broadcastCreateSlice.actions;

export const defaultBroadcastCreate = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastCreateSlice());
  };
}

export const submitBroadcastCreate = (params) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastCreateSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.create(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastCreateSuccessSlice(response?.data?.data));
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getBroadcastCreateFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getBroadcastCreateFailedSlice(data));
      })
  };
}

export default broadcastCreateSlice.reducer;