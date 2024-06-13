import { useAppDispatch } from '@/store/features/hooks'
import { MutableRefObject, useEffect, useRef } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { getParamObjectFromURL } from '@/helpers/url'
import {
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
} from '@/store/features/recipes/recipes.actions'

export interface IFetchListData {
  count: number
  next: string
  previous: string
  results: IRecipe[]
  detail?: string
}

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
  const { data, isFetching, isLoading, error, status } = useGetFavoritesQuery({
    pathname: 'recipe/favorites',
    params: {},
  })
  const [trigger] = useLazyGetFavoritesQuery()
  const loadNextPageRef = useRef(() => {})

  useEffect(() => {
    loadNextPageRef.current = () => {
      loadNextPageRef.current = () => {
        if (data?.next) {
          trigger({
            pathname: 'recipe/favorites',
            params: getParamObjectFromURL(data?.next),
          })
        }
      }
    }
  }, [data?.next, trigger])

  return {
    isLoading,
    status,
    error,
    fetchData: data,
    recipies: data?.results?.map((e) => ({ ...e, is_favorite: true })) || [],
    loadNextPageRef,
  }
}
