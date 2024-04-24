import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL, instanceAxios } from '@/services/auth/auth.service'
import axios from 'axios'

export const fetchGetFavorites = createAsyncThunk(
	'getFavorite/fetchGetFavorite',
	async (_, { rejectWithValue }) => {
		try {
			const res = await instanceAxios({
				method: 'GET',
				url: 'recipe/favorites/',
			})
			return res.data
		} catch (err) {
			// @ts-ignore
			return rejectWithValue(err?.response?.data)
		}
	},
)
