import { configureStore } from '@reduxjs/toolkit'
import userRegistrationReducer from './user/user-registration.slice'
import userAuthorizationReducer from './user/user-authorization.slice'
import userDateMeReducer from './user/user-data-me.slice'
import userActivateAccountReducer from './user/user-activation.slice'
import recipesFeedReducer from './recipes/recipes.slice'
import recipeFeedReducer from './recipe/recipe.slice'
import userFormDataEdit from './user/user-data-form-edit.slice'
import getFavoriteReducer from './favorites/favorites.slice'
import getUserNameWithoutToken from './user/user-getData-username.slice'

export const store = configureStore({
	reducer: {
		userRegistration: userRegistrationReducer,
		userAuthorization: userAuthorizationReducer,
		userDateMe: userDateMeReducer,
		userActivation: userActivateAccountReducer,
		userFormDataEdit: userFormDataEdit,
		recipesFeed: recipesFeedReducer,
		recipeFeed: recipeFeedReducer,
		favorites: getFavoriteReducer,
		userName: getUserNameWithoutToken,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
