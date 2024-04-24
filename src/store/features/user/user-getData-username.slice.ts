import { createSlice } from '@reduxjs/toolkit'
import { fetchDataUserName } from './user.actions'

interface IUserName {
	user: {
		id: number
		username: string
		display_name: string
		email: string
		avatar: string
		city: string
		country: string
		bio: string
		date_joined: string
		first_name: string
		last_name: string
		is_active: boolean
		is_banned: boolean
		is_staff: boolean
		is_admin: boolean
	}
	isError: null
	isLoaded: boolean
	success: boolean
}

const initialState: IUserName = {
	user: {
		id: 1,
		username: '',
		display_name: '',
		email: '',
		avatar: '',
		city: '',
		country: '',
		bio: '',
		date_joined: '2022-01-01',
		first_name: '',
		last_name: '',
		is_active: true,
		is_banned: false,
		is_staff: false,
		is_admin: false,
	},
	isError: null,
	isLoaded: true,
	success: false,
}

const dataUserName = createSlice({
	name: 'dataUserName',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataUserName.pending, (state) => {
				state.isLoaded = false
				state.isError = null
			})
			.addCase(fetchDataUserName.fulfilled, (state, action) => {
				// console.log(
				//   "Данные которые пришли, по конкретному пользователю",
				//   action.payload
				// );
				state.isLoaded = false
				// @ts-ignore
				state.user = action.payload
			})
			.addCase(fetchDataUserName.rejected, (state, action) => {
				// console.log(
				//   "ошибка из слайса >> получения данных пользователя",
				//   action.payload
				// );
				state.isLoaded = false
				// @ts-ignore
				state.isError = action.payload
			})
	},
})

export default dataUserName.reducer
