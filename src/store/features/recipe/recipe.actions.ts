import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosBaseQuery, instanceAxios } from '@/services/auth/auth.service'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IFetchListData } from '../recipes/recipes.types'
import { convertObjectToQueryParams } from '@/helpers/url'

export const fetchAddToFavorites = createAsyncThunk(
  'recipe/addToFavorites',
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: 'POST',
        url: `recipe/${slug}/favorite/`,
      })
      return res.data
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data)
    }
  },
)

export const fetchRemoveFromFavorites = createAsyncThunk(
  'recipe/removeFromFavorites',
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: 'DELETE',
        url: `recipe/${slug}/favorite/`,
      })
      return res.data
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data)
    }
  },
)

// RTK замена
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Единый запрос для разных списков рецептов
    getFetchListByUrl: builder.query<IFetchListData, string>({
      query: (url) => ({ url }),
    }),

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

export const {
  useGetFetchListByUrlQuery,
  useLazyGetFetchListByUrlQuery,
  useGetListQuery,
  useLazyGetListQuery,
} = recipeApi
