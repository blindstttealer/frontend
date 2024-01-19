import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    getFetchUser: {
        id: number
        username?: string,
        email: string,
    },
    profileFromActivation: {
        username?: string,
        email: string,
        password: string,
        repeat_password?: string,
    }
    isAuth?: boolean,
    isError?: any,
    isLoading?: boolean,
}

const initialState: IInitialState = {
    getFetchUser: {
        id: 0,
        username: '',
        email: '',
    },
    profileFromActivation: {
        email: '',
        password: '',
    },
    isAuth: false,
    isError: '',
    isLoading: false,
}

export const userRegistration = createSlice({
    name: 'userRegistration',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = true
            console.log("данные которые пришли c полей формы", action.payload)
            state.profileFromActivation = action.payload
            // state.isLoaded = false;
            state.isAuth = true
        },
        loginFailure: (state, action) => {
            console.log("данные с ошибкой", action.payload)
            state.isLoading = false;
            state.isAuth = false
            state.isError = action.payload
        },
        fetchUserData: (state, action) => {
            state.isLoading = true
            state.getFetchUser = action.payload
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, fetchUserData } = userRegistration.actions;
export default userRegistration.reducer