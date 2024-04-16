import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './config/store';
import {logOutUnathorized} from './redux/authSlice';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

const UNAUTHORIZED = 401;
const {dispatch} = store;
axios.interceptors.response.use(
  response => response,
  (error) => {
    const {status, data} = error.response;
    if (status === UNAUTHORIZED) dispatch(logOutUnathorized(data?.meta?.message));
    return Promise.reject(error);
  }
);

reportWebVitals();
