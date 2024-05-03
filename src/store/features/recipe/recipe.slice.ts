import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAddToFavorites,
  fetchRemoveFromFavorites,
} from '@/store/features/recipe/recipe.actions'
import { IRecipe } from './recipe.types'

interface IInitialState {
  recipe?: IRecipe
  error: null | any
  isLoading: boolean
  flag: boolean
}

const initialState: IInitialState = {
  error: null,
  isLoading: false,
  flag: false,
}

const recipeFeed = createSlice({
  name: 'recipeFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch add to favorites
      .addCase(fetchAddToFavorites.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAddToFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        // state. = action.payload
      })
      .addCase(fetchAddToFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // fetch remove from favorites
      .addCase(fetchRemoveFromFavorites.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchRemoveFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(fetchRemoveFromFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default recipeFeed.reducer
