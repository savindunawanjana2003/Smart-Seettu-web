import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MailState {
  showEmailIcon: boolean;
}

const initialState: MailState = {
  showEmailIcon: false,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setShowEmailIcon: (state, action: PayloadAction<boolean>) => {
      state.showEmailIcon = action.payload;
    },
  },
});

export const { setShowEmailIcon } = mailSlice.actions;
export default mailSlice.reducer;
