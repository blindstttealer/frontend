import { createSlice } from '@reduxjs/toolkit'
import { fetchGetFavorites } from './favorite.actions'
import { IRecipe } from '../recipes/recipes.types'

export interface IFetchListData {
  count: number
  next: string
  previous: string
  results: IRecipe[]
  detail?: string
}
interface IInitialState {
  fetchData: IFetchListData
  favorites: IRecipe[]
  error: null | string
  isLoading: boolean
  status: 'idle' | 'pending' | 'success' | 'error'
}

export const initialState: IInitialState = {
  fetchData: {
    count: 1,
    next: '',
    previous: '',
    results: [],
  },
  favorites: [],
  error: null,
  isLoading: false,
  status: 'idle',
}

const getFavorite = createSlice({
  name: 'getFavorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFavorites.pending, (state) => {
        state.isLoading = true
        state.status = 'pending'
      })
      .addCase(fetchGetFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = 'success'
        state.fetchData = action.payload
        state.favorites = [...state.favorites, ...action.payload.results]
      })
      .addCase(fetchGetFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.status = 'error'
        state.error = action.error.message ?? null
      })
  },
})

export default getFavorite.reducer
