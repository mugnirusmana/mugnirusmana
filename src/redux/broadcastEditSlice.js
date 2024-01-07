import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  data: {}
};

export const broadcastEditSlice = createSlice({
  name: "broadcastEdit",
  initialState,
  reducers: {
    defaultBroadcastEditSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {};
    },
    getBroadcastEditSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastEditSuccessSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastEditFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultBroadcastEditSlice, getBroadcastEditSlice, getBroadcastEditSuccessSlice, getBroadcastEditFailedSlice } = broadcastEditSlice.actions;

export const defaultBroadcastEdit = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastEditSlice());
  };
}

export const submitBroadcastEdit = (id, params) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastEditSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.update(id, params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastEditSuccessSlice());
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            data: response?.data?.data??{},
          }
          dispatch(getBroadcastEditFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          data: error?.response?.data?.data??{},
        }
        dispatch(getBroadcastEditFailedSlice(data));
      })
  };
}

export default broadcastEditSlice.reducer;