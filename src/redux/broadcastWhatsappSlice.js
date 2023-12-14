import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const broadcastWhatsappSlice = createSlice({
  name: "broadcastWhatsapp",
  initialState,
  reducers: {
    defaultBroadcastWhatsappSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.data = {};
    },
    getBroadcastWhatsappSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastWhatsappSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getBroadcastWhatsappFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBroadcastWhatsappSlice, getBroadcastWhatsappSlice, getBroadcastWhatsappSuccessSlice, getBroadcastWhatsappFailedSlice } = broadcastWhatsappSlice.actions;

export const defaultBroadcastWhatsapp = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastWhatsappSlice());
  };
}

export const sendToWhatsapp = (id) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastWhatsappSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.sentToWhatsapp(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBroadcastWhatsappSuccessSlice(response?.data?.data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong'
          dispatch(getBroadcastWhatsappFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong'
        dispatch(getBroadcastWhatsappFailedSlice(message));
      })
  };
}

export default broadcastWhatsappSlice.reducer;