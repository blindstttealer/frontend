import { createSlice } from '@reduxjs/toolkit'
import { fetchDataUser } from './user.actions'

const initialState = {
	user: {
		username: '',
		id: 5,
		avatar: '',
		is_active: true,
		is_stuff: false,
		is_admin: false,
	},
	isError: null,
	isLoaded: true,
	success: false,
}

const userDataMe = createSlice({
	name: 'userDataMe',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataUser.pending, (state) => {
				state.isLoaded = false
				state.isError = null
			})
			.addCase(fetchDataUser.fulfilled, (state, action) => {
				// console.log(
				//   "Данные которые пришли, по конкретному пользователю",
				//   action.payload
				// );
				state.isLoaded = false
				// @ts-ignore
				state.user = action.payload
				state.success = true
			})
			.addCase(fetchDataUser.rejected, (state, action) => {
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

export default userDataMe.reducer
