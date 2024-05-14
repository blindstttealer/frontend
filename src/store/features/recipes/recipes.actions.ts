import {
  axiosBaseQuery,
} from '@/services/auth/auth.service'
import { createApi } from '@reduxjs/toolkit/query/react'
import { convertObjectToQueryParams } from '@/helpers/url'
import { IFetchListData } from './recipes.types'

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Единый запрос для разных списков рецептовы
    getList: builder.query<
      IFetchListData,
      {
        pathname: string
        params: Record<string, string>
      }
    >({
      query: ({ pathname, params }) => {
        return {
          url: `${pathname}/?${convertObjectToQueryParams(params)}`,
          method: 'GET',
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs.params }
        if (newQueryArgs.page) {
          delete newQueryArgs.page
        }
        return newQueryArgs
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          }
        }
        return newItems
      },
    }),
  }),
})

export const { useGetListQuery, useLazyGetListQuery } = recipeApi
