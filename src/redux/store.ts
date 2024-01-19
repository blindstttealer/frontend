import { configureStore } from "@reduxjs/toolkit";
import userRegistration from "./features/user/userRegistration";
import userAuth from "./features/user/userAuth";
import dataUser from "./features/user/getUserProfile";

export const store = configureStore({
  reducer: { userRegistration, userAuth, dataUser },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
