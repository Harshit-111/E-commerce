import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ApiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";
const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaulltMiddleware) =>
    getDefaulltMiddleware().concat(ApiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
