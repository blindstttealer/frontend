import { configureStore } from "@reduxjs/toolkit";
import userRegistration from "./features/user/userRegistration";

export const store = configureStore({
  reducer: { userRegistration },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
