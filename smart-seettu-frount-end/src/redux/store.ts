import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slice/customerSlice";
import mailReducer from "../redux/slice/mailSlice"; // ඔබේ mail slice එක මෙතනට import කරන්න
export const store = configureStore({
  reducer: {
    customer: customerReducer,
    mail: mailReducer,
  },
});

// Component walata Types export  karanne methana
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
