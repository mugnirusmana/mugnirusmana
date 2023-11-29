import { createSlice } from "@reduxjs/toolkit";
import { sideMenu } from './sideMenuSlice';
import { AUTH } from "./../services";

const initialState = {
  token: "",
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeToken: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.token = null;
      state.data = {};
    },
    defaultLogIn: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    logIn: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    logInSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
      state.token = action?.payload?.token;
      state.data = action?.payload?.data;
    },
    logInFailed: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload;
    },
  },
});

// this is for dispatch
export const { removeToken, defaultLogIn, logIn, logInSuccess, logInFailed } = authSlice.actions;

export const signIn = (params, width, desktopSize) => {
  return async (dispatch, getState) => {
    dispatch(logIn());
    return AUTH.login(params)
      .then((response) => {
        if (response?.data?.meta?.status === 200) {
          const data = {
            token: response?.data?.data?.access_token,
            data: response?.data?.data
          }
          delete data.data.access_token;
          if (width < desktopSize) {
            dispatch(sideMenu(false));
          } else {
            dispatch(sideMenu(true));
          }
          dispatch(logInSuccess(data));
        } else {
          const message = response?.data?.meta?.message??'Oops! Someting went wrong';
          dispatch(logInFailed(message));
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.meta?.message??'Oops! Someting went wrong';
        dispatch(logInFailed(message));
      });
  };
};

export const defaultSignIn = () => {
  return async (dispatch, getState) => {
    dispatch(defaultLogIn());
  };
}

export const logOut = () => {
  return async (dispatch, getState) => {
    dispatch(logIn());
    setTimeout(() => {
      dispatch(removeToken());
    }, 1500);
  };
}

// this is for configureStore
export default authSlice.reducer;
