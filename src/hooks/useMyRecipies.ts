import { useEffect, useRef } from 'react'
import {
  useGetListQuery,
  useLazyGetListQuery,
} from '@/store/features/recipe/recipe.actions'
import { RecipeListDispatcher } from './useFavorites'
import { getParamObjectFromURL } from '@/helpers/url'

export const getUseMyRecipies = (username: string) => {
  const useMyRecipies: RecipeListDispatcher = () => {
    const { data, isFetching, isLoading, error, status } = useGetListQuery({
      pathname: 'feed',
      params: { username },
    })
    const [trigger] = useLazyGetListQuery()

    const loadNextPageRef = useRef(() => {})

    useEffect(() => {
      loadNextPageRef.current = () => {
        if (data?.next) {
          trigger({
            pathname: 'feed',
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
