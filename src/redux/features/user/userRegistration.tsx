import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    profileFromActivation: {
        username?: string,
        email: string,
        password: string,
        repeat_password?: string,
    }
    isAuth?: boolean,
    isError?: any,
    isLoaded?: boolean,
}

const initialState: IInitialState = {
    profileFromActivation: {
        email: '',
        password: '',
    },
    isAuth: false,
    isError: '',
    isLoaded: false,
}

export const userRegistration = createSlice({
    name: 'userRegistration',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoaded = true
        },
        loginSuccess: (state, action) => {
            console.log("данные которые пришли с бека", action.payload)
            state.profileFromActivation = action.payload
            state.isLoaded = false;
            state.isAuth = true
        },
        loginFailure: (state, action) => {
            console.log("данные с ошибкой", action.payload)
            state.isLoaded = false;
            state.isAuth = false
            state.isError = action.payload
        },
    }
})

export const { loginStart, loginSuccess, loginFailure } = userRegistration.actions;
export default userRegistration.reducer