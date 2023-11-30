import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorCode: null,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    defaultReservationSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.errorCode = null;
    },
    getReservationSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.errorCode = null;
    },
    getReservationSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.errorCode = null;
      state.data = action?.payload;
    },
    getReservationFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.errorCode = action?.payload?.code;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultReservationSlice, getReservationSlice, getReservationSuccessSlice, getReservationFailedSlice } = reservationSlice.actions;

export const defaultReservation = () => {
  return async (dispatch, getState) => {
    dispatch(defaultReservationSlice());
  };
}

export const submitReservation = (params) => {
  return async (dispatch, getState) => {
    dispatch(getReservationSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.submitReservation(params, token)
      .then((response) => {
        if (response?.data?.meta?.status === 201) {
          dispatch(getReservationSuccessSlice(response?.data?.data));
        } else {
          const data = {
            message: response?.data?.meta?.message??'Oops! Someting went wrong',
            code: response?.data?.meta?.status??500,
            data: response?.data?.data??{},
          }
          dispatch(getReservationFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = {
          message: error?.response?.data?.meta?.message??'Oops! Someting went wrong',
          code: error?.response?.data?.meta?.status??500,
          data: error?.response?.data?.data??{},
        }
        dispatch(getReservationFailedSlice(data));
      })
  };
}

export default reservationSlice.reducer;