import { createSlice } from '@reduxjs/toolkit'
import { fetchGetFavorites } from './favorite.actions'
import { AxiosError } from 'axios'

interface IInitialState {
	favorite: IFavorite
	isError: null | AxiosError
	isLoaded: boolean
	success: boolean
}

interface IFavorite {
	count: number
	next: string
	previous: string
	results: [
		{
			id: 1
			title: string
			slug: string
			author: {
				id: 1
				username: string
				display_name: string
				avatar: null | string
			}
			preview: string
			short_text: string
			tags: string[]
			comments_count: number
			reactions_count: number
			views_count: number
			cooking_time: number
			pub_date?: '2022-01-01T00:00:00Z'
		},
	]
	detail?: string
}

const initialState: IInitialState = {
	favorite: {
		count: 1,
		next: '',
		previous: '',
		results: [
			{
				id: 1,
				title: '',
				slug: '',
				author: {
					id: 1,
					username: '',
					display_name: '',
					avatar: null,
				},
				preview: '',
				short_text: '',
				tags: [],
				comments_count: 10,
				reactions_count: 10,
				views_count: 100,
				cooking_time: 30,
				pub_date: '2022-01-01T00:00:00Z',
			},
		],
	},

	isError: null,
	isLoaded: true,
	success: false,
}

const getFavorite = createSlice({
	name: 'getFavorite',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetFavorites.pending, (state) => {
				state.isLoaded = false
				state.isError = null
			})
			.addCase(fetchGetFavorites.fulfilled, (state, action) => {
				// action payload may be {detail: ""} or initialState{}
				state.favorite = action.payload
			})
			.addCase(fetchGetFavorites.rejected, (state, action) => {
				// @ts-ignore
				state.isError = action.payload
			})
	},
})

export default getFavorite.reducer
