import { configureStore } from "@reduxjs/toolkit";
import userRegistrationReducer from "./user/userRegistration.slice";
import userAuthorizationReducer from "./user/userAuthorization.slice";
import userDateMeReducer from "./user/userData.slice";

export const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    userAuthorization: userAuthorizationReducer,
    userDateMe: userDateMeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
