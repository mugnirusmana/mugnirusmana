import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../services";

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

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    defaultUserListSlice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserListSlice: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    getUserListSuccessSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action?.payload;
    },
    getUserListFailedSlice: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

export const { defaultUserListSlice, getUserListSlice, getUserListSuccessSlice, getUserListFailedSlice } = userListSlice.actions;

export const defaultUserList = () => {
  return async (dispatch, getState) => {
    dispatch(defaultUserListSlice());
  };
}

export const getUserList = (params) => {
  return async (dispatch, getState) => {
    dispatch(getUserListSlice());
    const token = getState()?.auth?.token;
    return USER.getList(params, token)
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
          dispatch(getUserListSuccessSlice(data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(getUserListFailedSlice(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(getUserListFailedSlice(message));
      })
  };
}

export default userListSlice.reducer;