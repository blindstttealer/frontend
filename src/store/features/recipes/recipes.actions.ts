import { axiosBaseQuery } from '@/services/auth/auth.service'
import { createApi } from '@reduxjs/toolkit/query/react'
import { convertObjectToQueryParams } from '@/helpers/url'
import { IFetchListData } from './recipes.types'
import { current } from '@reduxjs/toolkit'

export type ListParams = {
  pathname: string
  params: Record<string, string>
}

// массив со всеми вариантами параметров для запроса getList. Необходим для правки кеша при изменении даннных рецептов
const getListParamsVariants: ListParams[] = [
  { pathname: 'feed', params: { ordering: '-activity_count' } },
  { pathname: 'feed', params: {} },
  { pathname: 'feed', params: { filter: 'subscriptions' } },
]

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Recipes'],
  endpoints: (builder) => ({
    // Единый запрос для разных списков рецептов
    getRecipes: builder.query<IFetchListData, ListParams>({
      query: ({ pathname, params }) => {
        return {
          url: `${pathname}/?${convertObjectToQueryParams(params)}`,
          method: 'GET',
          providesTags: ['Recipes'],
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

    getFavorites: builder.query<IFetchListData, ListParams>({
      query: ({ pathname, params }) => {
        return {
          url: `${pathname}/?${convertObjectToQueryParams(params)}`,
          method: 'GET',
          providesTags: ['Favorites'],
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
          const fixedResults = newItems.results.map((e) => ({
            ...e,
            is_favorite: true,
          }))
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...fixedResults],
          }
        }
        return newItems
      },
    }),

    addToFavorites: builder.mutation<void, string>({
      query: (slug) => ({
        url: `recipe/${slug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['Recipes'], //todo не работает(
      async onQueryStarted(slug, { dispatch, queryFulfilled }) {
        await queryFulfilled

        //todo  правим кэш для избранного - чистить полностью как вариант, но не работает(
        // dispatch(
        //   recipeApi.util.updateQueryData(
        //     'getFavorites',
        //     {
        //       pathname: 'recipe/favorites',
        //       params: {},
        //     },
        //     (draft) => {
        //       const currentDraft = current(draft)
        //       const results: IRecipe[] = []
        //       Object.assign(draft, { ...currentDraft, results })
        //     },
        //   ),
        // )

        // правим кэш для всех запросов списка рецептов
        getListParamsVariants.forEach(({ pathname, params }) => {
          dispatch(
            recipeApi.util.updateQueryData(
              'getRecipes',
              {
                pathname,
                params,
              },
              (draft) => {
                const currentDraft = current(draft)
                const results = currentDraft.results.map((e) =>
                  e.slug === slug ? { ...e, is_favorite: true } : e,
                )
                Object.assign(draft, { ...currentDraft, results })
              },
            ),
          )
        })
      },
    }),

    removeFromFavorites: builder.mutation<void, string>({
      query: (slug) => ({
        url: `recipe/${slug}/favorite/`,
        method: 'DELETE',
      }),
      async onQueryStarted(slug, { dispatch, queryFulfilled }) {
        await queryFulfilled

        // правим кэш для избранного
        dispatch(
          recipeApi.util.updateQueryData(
            'getFavorites',
            {
              pathname: 'recipe/favorites',
              params: {},
            },
            (draft) => {
              const currentDraft = current(draft)
              const results = currentDraft.results.filter(
                (e) => e.slug !== slug,
              )
              Object.assign(draft, { ...currentDraft, results })
            },
          ),
        )

        // правим кэш для всех запросов списка рецептов
        getListParamsVariants.forEach(({ pathname, params }) => {
          dispatch(
            recipeApi.util.updateQueryData(
              'getRecipes',
              {
                pathname,
                params,
              },
              (draft) => {
                const currentDraft = current(draft)
                const results = currentDraft.results.map((e) =>
                  e.slug === slug ? { ...e, is_favorite: false } : e,
                )
                Object.assign(draft, { ...currentDraft, results })
              },
            ),
          )
        })
      },
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useLazyGetRecipesQuery,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = recipeApi
