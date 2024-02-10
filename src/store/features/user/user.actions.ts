import {createAsyncThunk} from "@reduxjs/toolkit";
import {IDataFromForm, IDataFromResolve, ITokens} from "./user.types";
import {instanceAxios} from "@/services/auth/auth.service";

export const fetchRegistration = createAsyncThunk<
    IDataFromResolve,
    IDataFromForm
>(
    "userRegistration/fetchRegistration",
    async (dataFromForm, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "POST",
                url: "auth/users/",
                data: dataFromForm,
            });
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);

export const fetchActivation = createAsyncThunk<ITokens, IDataFromForm>(
    "userActivation/fetchActivation",
    async (dataFromForm, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "POST",
                url: "auth/jwt/create/",
                data: dataFromForm,
            });
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);

export const fetchDataUser = createAsyncThunk(
    "userDataMe/fetchDataUser",
    async (_, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "GET",
                url: "auth/users/me",
            });
            // console.log("данные которые пришли с бека", res.data);
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);
