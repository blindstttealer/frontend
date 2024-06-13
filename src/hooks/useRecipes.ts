import { MutableRefObject, useEffect, useRef } from 'react'
import {
  useGetRecipesQuery,
  useLazyGetRecipesQuery,
} from '@/store/features/recipes/recipes.actions'
import { getParamObjectFromURL } from '@/helpers/url'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { IFetchListData, IRecipe } from '@/store/features/recipes/recipes.types'

export type RecipeListVariant = 'default' | 'top' | 'subscribe'

export const urlByVariant: Record<RecipeListVariant, string> = {
  default: 'feed/',
  top: 'feed/',
  subscribe: 'feed/',
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

export const getUseRecipes = (
  pathname: string,
  params: Record<string, string> = {},
) => {
  const useMyRecipies: RecipeListDispatcher = () => {
    const { data, isFetching, isLoading, error, status } = useGetRecipesQuery({
      pathname,
      params,
    })
    const [trigger] = useLazyGetRecipesQuery()

    const loadNextPageRef = useRef(() => {})

    useEffect(() => {
      loadNextPageRef.current = () => {
        if (data?.next) {
          trigger({
            pathname,
            params: getParamObjectFromURL(data?.next),
          })
        }
      }
    }, [data?.next, trigger])

    return {
      isLoading,
      isFetching,
      status,
      error,
      fetchData: data,
      recipies: data?.results,
      loadNextPageRef,
    }
  }

  return useMyRecipies
}
