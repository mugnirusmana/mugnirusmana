import { createSlice } from "@reduxjs/toolkit";
import { BLOCKDOMAIN } from "../services";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const blockDomainRemoveSlice = createSlice({
  name: "blockDomainRemove",
  initialState,
  reducers: {
    defaultBlockDomainRemoveSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainRemoveSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainRemoveSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    getBlockDomainRemoveFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultBlockDomainRemoveSlice, getBlockDomainRemoveSlice, getBlockDomainRemoveSuccessSlice, getBlockDomainRemoveFailedSlice } = blockDomainRemoveSlice.actions;

export const defaultBlockDomainRemove = () => {
  return async (dispatch, getState) => {
    dispatch(defaultBlockDomainRemoveSlice());
  };
}

export const removeBlockDomain = (id) => {
  return async (dispatch, getState) => {
    dispatch(getBlockDomainRemoveSlice());
    const token = getState()?.auth?.token;
    return BLOCKDOMAIN.remove(id, token)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(getBlockDomainRemoveSuccessSlice());
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getBlockDomainRemoveFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getBlockDomainRemoveFailedSlice(message));
      })
  };
}

export default blockDomainRemoveSlice.reducer;