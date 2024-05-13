import { createSlice } from '@reduxjs/toolkit'
import { RecipeListVariant } from '@/hooks/useRecipes'

export type RecipeView = 'feed' | 'tile'
interface IInitialState {
  view: RecipeView
  sort: RecipeListVariant
}

const initialState: IInitialState = {
  view: 'feed',
  sort: 'top',
}

const recipesSettings = createSlice({
  name: 'recipesFeed',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.view = action.payload
    },
    setSortMode: (state, action) => {
      state.sort = action.payload
    },
  },
})

export const { setViewMode, setSortMode } = recipesSettings.actions
export default recipesSettings.reducer
