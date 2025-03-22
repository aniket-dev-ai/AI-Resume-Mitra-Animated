import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;
