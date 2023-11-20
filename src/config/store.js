import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "./root-reducers";
import ENV from "./base-env";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "sideMenu"],
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export default configureStore({
  devTools: ENV.MODE !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
