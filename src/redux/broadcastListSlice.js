import { createSlice } from "@reduxjs/toolkit";
import { BROADCAST } from "../services";

const initialState = {
  data: {
    list: {
      data: [],
      paginate: {
        totalPage: 0,
        totalData: 0,
      },
    },
    currentPage: 1,
    perPage: 10,
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const broadcastListSlice = createSlice({
  name: "broadcastList",
  initialState,
  reducers: {
    defaultBroadcastListSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastListSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBroadcastListSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getBroadcastListFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBroadcastListSlice, getBroadcastListSlice, getBroadcastListSuccessSlice, getBroadcastListFailedSlice } = broadcastListSlice.actions;

export const defaultBroadcastList = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBroadcastListSlice());
  };
}

export const getBroadcastList = (params) => {
  return async (dispatch, getState) => {
    dispatch(getBroadcastListSlice());
    const token = getState()?.auth?.token;
    return BROADCAST.getList(params, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          let data = {
            list: {
              data: response?.data?.data?.data,
              paginate: {
                totalPage: response?.data?.data?.last_page,
                totalData: response?.data?.data?.total,
              },
            },
            currentPage: response?.data?.data?.current_page,
            perPage: response?.data?.data?.per_page,
          }
          dispatch(getBroadcastListSuccessSlice(data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getBroadcastListFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getBroadcastListFailedSlice(message));
      })
  };
}

export default broadcastListSlice.reducer;