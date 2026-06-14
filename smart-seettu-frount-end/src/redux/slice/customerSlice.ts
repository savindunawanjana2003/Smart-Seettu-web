import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface CustomerState {
  currentCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const savedCustomer = localStorage.getItem("currentCustomer")
  ? JSON.parse(localStorage.getItem("currentCustomer")!)
  : null;

const initialState: CustomerState = {
  currentCustomer: savedCustomer,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    loginCustomer: (state, action: PayloadAction<Customer>) => {
      state.currentCustomer = action.payload;
      alert(action.payload);
      state.error = null;
      localStorage.setItem("currentCustomer", JSON.stringify(action.payload));
    },

    logoutCustomer: (state) => {
      state.currentCustomer = null;
      state.error = null;

      localStorage.removeItem("currentCustomer");
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { loginCustomer, logoutCustomer, setLoading, setError } =
  customerSlice.actions;
export default customerSlice.reducer;
