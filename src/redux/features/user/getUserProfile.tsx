import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    isLoading: boolean,
    profile: {
        username: string,
        email: string
    },
    isError: any
}

const initialState: IInitialState = {
    isLoading: false,
    profile: {
        username: '',
        email: ''
    },
    isError: false
}

export const dataUser = createSlice({
    name: 'dataUser',
    initialState,
    reducers: {
        getDataProfileStart: (state) => {
            state.isLoading = true
        },
        getDataProfileSuccess: (state, action) => {
            state.isLoading = false
            console.log("данные которые пришли с бека при авторизации", action.payload)
            state.profile = action.payload

        },
        getDataProfileFailure: (state, action) => {
            state.isLoading = true;
            console.log("данные с ошибкой при авторизации", action.payload)
            state.isError = action.payload
        },
    }
})

export const { getDataProfileSuccess, getDataProfileFailure, getDataProfileStart } = dataUser.actions;
export default dataUser.reducer