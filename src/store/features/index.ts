import { configureStore } from '@reduxjs/toolkit'
import userRegistrationReducer from './user/user-registration.slice'
import userDateMeReducer from './user/user-data-me.slice'
import userActivateAccountReducer from './user/user-activation.slice'
import authReducer from './auth/auth.slice'
import userSettingsReducer from './user/user.slice'
import userFormDataEdit from './user/user-data-form-edit.slice'
import getUserNameWithoutToken from './user/user-getData-username.slice'
import { recipeReactionsApi } from './reactions/reactions.actions'
import { userApi } from './user/user.actions'
import { recipeApi } from './recipes/recipes.actions'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
  key: 'auth',
  storage,
}
const authPersistedReducer = persistReducer(
  authPersistConfig,
  authReducer,
)

const userSettingsPersistConfig = {
  key: 'userSettings',
  storage,
}
const userSettingsPersistedReducer = persistReducer(
  userSettingsPersistConfig,
  userSettingsReducer,
)

export const Store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    userDateMe: userDateMeReducer,
    userActivation: userActivateAccountReducer,
    userFormDataEdit: userFormDataEdit,
    auth: authPersistedReducer,
    userSettings: userSettingsPersistedReducer,
    userName: getUserNameWithoutToken,
    [recipeReactionsApi.reducerPath]: recipeReactionsApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(recipeReactionsApi.middleware)
      .concat(userApi.middleware)
      .concat(recipeApi.middleware),
})

export const makeStore = () => Store
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export const persistor = persistStore(Store)
