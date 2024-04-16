import { createSlice } from "@reduxjs/toolkit";
import { ATTENDER } from "../services";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    defaultCommentListSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.errorCode = null;
    },
    getCommentListSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.errorCode = null;
    },
    getCommentListSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.errorCode = null;
      state.data = action?.payload;
    },
    getCommentListFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
      state.errorCode = action?.payload?.code;
      state.data = action?.payload?.data;
    },
  },
});

export const { defaultCommentListSlice, getCommentListSlice, getCommentListSuccessSlice, getCommentListFailedSlice } = commentSlice.actions;

export const defaultCommentList = () => {
  return async (dispatch, getState) => {
    dispatch(defaultCommentListSlice());
  };
}

export const getCommentList = () => {
  return async (dispatch, getState) => {
    dispatch(getCommentListSlice());
    return ATTENDER.getCommentList()
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getCommentListSuccessSlice(response?.data?.data));
        } else {
          const data = response?.data?.meta?.message??'Oops! Someting went wrong'
          dispatch(getCommentListFailedSlice(data));
        }
      })
      .catch((error) => {
        const data = error?.response?.data?.meta?.message??'Oops! Someting went wrong'
        dispatch(getCommentListFailedSlice(data));
      })
  };
}

export default commentSlice.reducer;