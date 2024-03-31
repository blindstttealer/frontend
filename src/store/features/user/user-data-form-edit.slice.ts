import { createSlice } from '@reduxjs/toolkit'
import { fetchFormDataUser } from './user.actions'

const initialState = {
	user: {
		id: 66,
		username: '',
		display_name: '',
		email: '',
		avatar: null,
		phone: '',
		date_joined: '',
		country: '',
		city: '',
		first_name: '',
		last_name: '',
		bio: '',
		is_active: false,
		is_staff: false,
		is_admin: false,
	},
	isError: null,
	isLoaded: false,
	success: false,
}

const userFormDataEdit = createSlice({
	name: 'userFormDataEdit',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFormDataUser.pending, (state) => {
				state.isLoaded = false
				state.isError = null
			})
			.addCase(fetchFormDataUser.fulfilled, (state, action) => {
				// console.log(
				// 	'Данные которые пришли, по конкретному пользователю после изменения',
				// 	action.payload,
				// )
				state.isLoaded = true
				// @ts-ignore
				state.user = action.payload
				state.success = true
			})
			.addCase(fetchFormDataUser.rejected, (state, action) => {
				// console.log(
				// 	'ошибка из слайса >> получения данных пользователя после изменения',
				// 	action.payload,
				// )
				state.isLoaded = false
				// @ts-ignore
				state.isError = action.payload
			})
	},
})

export default userFormDataEdit.reducer
