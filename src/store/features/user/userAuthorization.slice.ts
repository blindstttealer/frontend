import { createSlice } from "@reduxjs/toolkit";
import { fetchActivation } from "./user.actions";

const initialState = {
  tokens: {
    access: "",
    refresh: "",
  },
  isError: null,
  isLoaded: false,
  flag: false,
};

const userAuthorization = createSlice({
  name: "userAuthorization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivation.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchActivation.fulfilled, (state, action) => {
        console.log(
          "Данные которые пришли, после авторизации должны быть токены",
          action.payload
        );
        state.isLoaded = false;
        // @ts-ignore
        state.tokens = action.payload;
        window.localStorage.setItem("access_token_svd", state.tokens.access);
        window.localStorage.setItem("refresh_token_svd", state.tokens.refresh);
        state.flag = true;
      })
      .addCase(fetchActivation.rejected, (state, action) => {
        console.log("ошибка из слайса АВТОРИЗАЦИИ", action.payload);
        state.flag = false;
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.payload;
      });
  },
});

export default userAuthorization.reducer;
