import { configureStore } from "@reduxjs/toolkit";
import userRegistrationReducer from "./user/user.slice";

export const store = configureStore({
  reducer: { userReg: userRegistrationReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
