import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

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

export const attenderListSlice = createSlice({
  name: "attenderList",
  initialState,
  reducers: {
    defaultAttenderListSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderListSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getAttenderListSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getAttenderListFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultAttenderListSlice, getAttenderListSlice, getAttenderListSuccessSlice, getAttenderListFailedSlice } = attenderListSlice.actions;

export const defaultAttenderList = () => {
  return async (dispatch, getState) => {
    dispatch(defaultAttenderListSlice());
  };
}

export const getAttenderList = (params) => {
  return async (dispatch, getState) => {
    dispatch(getAttenderListSlice());
    const token = getState()?.auth?.token;
    return ATTENDER.getList(params, token)
      .then((response) => {
        if (response?.data?.meta?.status === 200) {
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
          dispatch(getAttenderListSuccessSlice(data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getAttenderListFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getAttenderListFailedSlice(message));
      })
  };
}

export default attenderListSlice.reducer;