import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { MutableRefObject, useEffect, useRef } from 'react'
import { fetchGetFavorites } from '@/store/features/favorites/favorite.actions'
import { IFetchListData } from '@/store/features/favorites/favorites.slice'
import { IRecipe } from '@/store/features/recipe/recipe.types'
import { QueryStatus } from '@reduxjs/toolkit/query'

export type RecipeListDispatcher = () => {
  isLoading: boolean
  isFetching?: boolean
  status?: QueryStatus
  error: any
  fetchData?: IFetchListData
  recipies?: IRecipe[]
  loadNextPageRef: MutableRefObject<() => void>
}

export const useFavorites: RecipeListDispatcher = () => {
  const dispatch = useAppDispatch()
  const {
    isLoading,
    status,
    error,
    fetchData,
    favorites: recipies,
  } = useAppSelector((state) => state.favorites)
  const loadNextPageRef = useRef(() => {})

  useEffect(() => {
    loadNextPageRef.current = () => {
      if (fetchData.next !== null)
        dispatch(fetchGetFavorites(fetchData.next || 'recipe/favorites'))
    }
  }, [dispatch, fetchData.next])

  return {
    isLoading,
    status,
    error,
    fetchData,
    recipies,
    loadNextPageRef,
  }
}
