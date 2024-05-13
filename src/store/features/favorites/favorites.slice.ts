import { createSlice } from '@reduxjs/toolkit'
import { fetchGetFavorites } from './favorite.actions'
import { IRecipe } from '../recipes/recipes.types'
import { QueryStatus } from '@reduxjs/toolkit/query'

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
  status: QueryStatus
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
  status: QueryStatus.uninitialized,
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
        state.status = QueryStatus.pending
      })
      .addCase(fetchGetFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = QueryStatus.fulfilled
        state.fetchData = action.payload
        const newItems = Array.isArray(action.payload.results)
          ? action.payload.results.map((recipe: IRecipe) => ({
              ...recipe,
              // поля is_favorite нет в результатах запроса. Добавлено для универсальности использования компонента Recipe в списке рецептов и закладках
              is_favorite: true,
            }))
          : []
        state.favorites = [...state.favorites, ...newItems]
      })
      .addCase(fetchGetFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.status = QueryStatus.rejected
        state.error = action.error.message ?? null
      })
  },
})

export const { removeFromList } = getFavorite.actions
export default getFavorite.reducer
