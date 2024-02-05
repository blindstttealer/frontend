import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "@/services/auth/auth.service";
import axios from "axios";

interface IDataFromResolve {
  username: string;
  email: string;
  id: number;
}

interface IDataFromForm {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

const initialState = {
  profileFromActivation: {
    username: "",
    email: "",
    password: "",
    repeat_password: "",
  },
  profile: {
    username: "",
    email: "",
    id: 0,
  },
  isError: {},
  isLoaded: false,
};

export const fetchRegistration = createAsyncThunk<any, IDataFromForm>(
  "userRegistrate/fetchRegistrate",

  async (dataFromForm, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}users/`, dataFromForm);
      return res.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

const userRegistration = createSlice({
  name: "userRegistrate",
  initialState,
  reducers: {
    getDataFromActivation: (state, action) => {
      state.profileFromActivation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.isLoaded = true;
        state.isError = {};
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        console.log("Данные которые пришли, после регистрации", action.payload);
        state.isLoaded = false;
        state.profile = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        console.log("ошибка из слайса", action.payload);
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.payload;
      });
  },
});

export const { getDataFromActivation } = userRegistration.actions;

export default userRegistration.reducer;
