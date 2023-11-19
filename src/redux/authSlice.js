import { createSlice } from "@reduxjs/toolkit";
import { sideMenu } from './sideMenuSlice';
// import { AUTH } from "./../services";

const initialState = {
  token: "",
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
      state.token = action?.payload?.data?.token;
    },
    logInFailed: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action?.payload?.message;
    },
  },
});

// this is for dispatch
export const { removeToken, defaultLogIn, logIn, logInSuccess, logInFailed } = authSlice.actions;

export const signIn = (params, width, desktopSize) => {
  return async (dispatch, getState) => {
    dispatch(logIn());
    setTimeout(() => {
      const data = { data: { token: "fakeToken" } };
      if (width < desktopSize) {
        dispatch(sideMenu(false));
      } else {
        dispatch(sideMenu(true));
      }
      dispatch(logInSuccess(data));
    }, 1500);
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
