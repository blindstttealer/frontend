import { createAsyncThunk } from '@reduxjs/toolkit'
import { instanceAxios } from '@/services/auth/auth.service'
import { isAxiosError } from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const fetchGetFavorites = createAsyncThunk(
  'getFavorite/fetchGetFavorite',
  async ({page, url1}: { page?: number, url1?: string }, { rejectWithValue }) => {
    const url = url1 || `recipe/favorites/?page=${page || 1}`

    try {
      const res = await instanceAxios({
        method: 'GET',
        url,
      })
      return res.data
    } catch (error) {
      if (isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue(String(error))
      }
    }
  },
)
