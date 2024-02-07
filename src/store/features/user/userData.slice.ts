import { createSlice } from "@reduxjs/toolkit";
import { fetchDataUser } from "./user.actions";

const initialState = {
  user: {
    username: "",
    id: 5,
    email: "",
  },
  isError: null,
  isLoaded: false,
};

const userDataMe = createSlice({
  name: "userDataMe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUser.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        console.log(
          "Данные которые пришли, по конкретному пользователю",
          action.payload
        );
        state.isLoaded = false;
        // @ts-ignore
        state.user = action.payload;
      })
      .addCase(fetchDataUser.rejected, (state, action) => {
        console.log(
          "ошибка из слайса >> получения данных пользователя",
          action.payload
        );
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.payload;
      });
  },
});

export default userDataMe.reducer;
