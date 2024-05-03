import { createAsyncThunk } from '@reduxjs/toolkit'
import { instanceAxios } from '@/services/auth/auth.service'
import { isAxiosError } from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const fetchGetFavorites = createAsyncThunk(
  'getFavorite/fetchGetFavorite',
  async (url: string, { rejectWithValue }) => {
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
