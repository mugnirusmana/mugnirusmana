import { createSlice } from "@reduxjs/toolkit";
import { sideMenu } from './sideMenuSlice';
import { AUTH } from "./../services";

const initialState = {
  token: "",
  data: {},
  isUnathorized: false,
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
    removeTokenUnathorized: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isUnathorized = true;
      state.errorMessage = action?.payload;
      state.token = null;
      state.data = {};
    },
    defaultRemoveTokenUnathorized: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isUnathorized = false;
      state.errorMessage = null;
    },
    setTokenSlice: (state, action) => {
      state.token = action?.payload?.token;
      state.data = action?.payload?.data;
    },
    setDataSlice: (state, action) => {
      state.data = action?.payload;
    },
  },
});

// this is for dispatch
export const { removeToken, defaultLogIn, logIn, logInSuccess, logInFailed, removeTokenUnathorized, defaultRemoveTokenUnathorized, setTokenSlice, setDataSlice } = authSlice.actions;

export const signIn = (params, width, desktopSize) => {
  return async (dispatch, getState) => {
    dispatch(logIn());
    return AUTH.login(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
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

export const logOutUnathorized = (message) => {
  return async (dispatch, getState) => {
    dispatch(removeTokenUnathorized(message));
  };
}

export const defaultLogOutUnathorized = () => {
  return async (dispatch, getState) => {
    dispatch(defaultRemoveTokenUnathorized());
  };
}

export const setToken = (data, width, desktopSize) => {
  return async (dispatch, getState) => {
    if (width < desktopSize) {
      dispatch(sideMenu(false));
    } else {
      dispatch(sideMenu(true));
    }
    dispatch(setTokenSlice(data))
  }
}

export const setData = (data) => {
  return async (dispatch, getState) => {
    dispatch(setDataSlice(data));
  }
}

export default authSlice.reducer;
