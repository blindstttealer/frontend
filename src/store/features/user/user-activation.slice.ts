import { createSlice } from "@reduxjs/toolkit";
import { fetchActivationUserToEmail } from "./user.actions";

const initialState = {
  isError: null,
  isLoaded: false,
  success: false,
};

const userActivationToEmail = createSlice({
  name: "userActivationToEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivationUserToEmail.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchActivationUserToEmail.fulfilled, (state) => {
        state.isLoaded = false;
        state.success = true;
      })
      .addCase(fetchActivationUserToEmail.rejected, (state, action) => {
        console.log(
          "ошибка из слайса АКТИВАЦИИ АКК через почту",
          action.payload
        );
        state.success = false;
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.payload;
      });
  },
});

export default userActivationToEmail.reducer;
