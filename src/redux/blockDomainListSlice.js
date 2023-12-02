import { createSlice } from "@reduxjs/toolkit";
import { BLOCKDOMAIN } from "../services";

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

export const blockDomainListSlice = createSlice({
  name: "blockDomainList",
  initialState,
  reducers: {
    defaultBlockDomainListSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainListSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainListSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getBlockDomainListFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBlockDomainListSlice, getBlockDomainListSlice, getBlockDomainListSuccessSlice, getBlockDomainListFailedSlice } = blockDomainListSlice.actions;

export const defaultBlockDomainList = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBlockDomainListSlice());
  };
}

export const getBlockDomainList = (params) => {
  return async (dispatch, getState) => {
    dispatch(getBlockDomainListSlice());
    const token = getState()?.auth?.token;
    return BLOCKDOMAIN.getList(params, token)
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
          dispatch(getBlockDomainListSuccessSlice(data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getBlockDomainListFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getBlockDomainListFailedSlice(message));
      })
  };
}

export default blockDomainListSlice.reducer;