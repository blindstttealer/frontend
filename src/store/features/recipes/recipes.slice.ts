import { createSlice } from '@reduxjs/toolkit'
import { RecipeListVariant } from '@/hooks/useRecipes'

export type RecipeView = 'feed' | 'tile'
export type MyRecipeSort = 'date' | 'ingredients'

interface IInitialState {
  view: RecipeView
  sort: RecipeListVariant
  sortMyRecipes: MyRecipeSort
  sortMyRecipesDate?: string // date with format 'yyyy-mm-dd'
}

const initialState: IInitialState = {
  view: 'feed',
  sort: 'top',
  sortMyRecipes: 'date',
}

// todo: сделать перманентное хранение в local storage
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
    setSortMyRecipesMode: (state, action) => {
      state.sortMyRecipes = action.payload
    },
    setDateSortMyRecipes: (state, action) => {
      state.sortMyRecipesDate = action.payload
    },
  },
})

export const { setViewMode, setSortMode, setSortMyRecipesMode, setDateSortMyRecipes } = recipesSettings.actions
export default recipesSettings.reducer
