import { createAsyncThunk } from '@reduxjs/toolkit'
import { instanceAxios } from '@/services/auth/auth.service'

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
