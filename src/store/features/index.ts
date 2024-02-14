import { configureStore } from "@reduxjs/toolkit";
import userRegistrationReducer from "./user/user-registration.slice";
import userAuthorizationReducer from "./user/user-authorization.slice";
import userDateMeReducer from "./user/user-data-me.slice";
import userActivateAccountReducer from "./user/user-activation.slice";

export const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    userAuthorization: userAuthorizationReducer,
    userDateMe: userDateMeReducer,
    userActivation: userActivateAccountReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
