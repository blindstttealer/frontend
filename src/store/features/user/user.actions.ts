// сделай типизацию
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDataFromForm, IDataFromResolve, ITokens } from './user.types'
import { BASE_URL, instanceAxios } from '@/services/auth/auth.service'
import axios from 'axios'

export const fetchRegistration = createAsyncThunk<
	IDataFromResolve,
	IDataFromForm
>(
	'userRegistration/fetchRegistration',
	async (dataFromForm, { rejectWithValue }) => {
		try {
			const res = await instanceAxios({
				method: 'POST',
				url: 'auth/users/',
				data: dataFromForm,
			})
			return res.data
		} catch (err) {
			// @ts-ignore
			return rejectWithValue(err?.response?.data)
		}
	},
)

export const fetchActivation = createAsyncThunk<ITokens, IDataFromForm>(
	'userActivation/fetchActivation',
	async (dataFromForm, { rejectWithValue }) => {
		try {
			const res = await instanceAxios({
				method: 'POST',
				url: 'auth/jwt/create/',
				data: dataFromForm,
			})
			return res.data
		} catch (err) {
			// @ts-ignore
			return rejectWithValue(err?.response?.data)
		}
	},
)

export const fetchDataUser = createAsyncThunk(
	'userDataMe/fetchDataUser',
	async (_, { rejectWithValue }) => {
		try {
			const res = await instanceAxios({
				method: 'GET',
				url: 'auth/users/me',
			})
			// console.log("данные которые пришли с бека", res.data);
			return res.data
		} catch (err) {
			// @ts-ignore
			return rejectWithValue(err?.response?.data)
		}
	},
)

export const fetchActivationUserToEmail = createAsyncThunk<any, any>(
	'userActivationToEmail/fetchActivationUserToEmail',
	async (dataFromUrlEmail, { rejectWithValue }) => {
		console.log(dataFromUrlEmail)
		try {
			const res = await axios({
				baseURL: `${BASE_URL}`,
				method: 'POST',
				url: 'auth/users/activation/',
				data: dataFromUrlEmail,
			})
			return res.data
		} catch (err) {
			// console.log(
			//   "ошибка которая пришла при попытке активации",
			//   rejectWithValue(err)
			// );
			// @ts-ignore
			return rejectWithValue(err?.response?.data)
		}
	},
)

export const fetchFormDataUser = createAsyncThunk<any, any>(
	'formDataUser/fetchFormDataUser',
	async (dataFormUser, { rejectWithValue }) => {
		console.log('dataFormUser', dataFormUser)
		try {
			const formData = new FormData()
			formData.append('display_name', dataFormUser.dataFromInput.display_name)
			formData.append('first_name', dataFormUser.dataFromInput.first_name)
			formData.append('last_name', dataFormUser.dataFromInput.last_name)
			formData.append('phone', dataFormUser.dataFromInput.phone)
			formData.append('country', dataFormUser.dataFromInput.country.label)
			formData.append('city', dataFormUser.dataFromInput.city)
			formData.append('bio', dataFormUser.dataFromInput.bio)
			dataFormUser.avatar !== null
				? formData.append('avatar', dataFormUser.avatar)
				: null
			const res = await instanceAxios({
				method: 'PATCH',
				url: `user/${dataFormUser.username}/`,
				data: formData,
			})
			return res.data
		} catch (err) {
			// console.log(
			// 	'ошибка которая пришла при попытке изменения данных',
			// 	rejectWithValue(err),
			// )
			//@ts-ignore
			return rejectWithValue(err?.response?.data)
		}
	},
)
