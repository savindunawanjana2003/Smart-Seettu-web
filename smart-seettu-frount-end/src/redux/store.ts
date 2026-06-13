import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slice/customerSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

// Component walata Types export  karanne methana
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
