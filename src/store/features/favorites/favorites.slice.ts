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
  reducers: {
    removeFromList: (state, action) => {
      state.favorites = state.favorites.filter(
        (el) => el.slug !== action.payload.slug,
      )
    },
  },
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
        const newItems = action.payload.results.map((recipe: IRecipe) => ({
          ...recipe,
          // поля is_favorite нет в результатах запроса. Добавлено для универсальности использования компонента Recipe в списке рецептов и закладках
          is_favorite: true,
        }))
        state.favorites = [...state.favorites, ...newItems]
      })
      .addCase(fetchGetFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.status = 'error'
        state.error = action.error.message ?? null
      })
  },
})

export const { removeFromList } = getFavorite.actions
export default getFavorite.reducer
