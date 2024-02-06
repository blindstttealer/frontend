import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataFromForm, IDataFromResolve } from "./user.types";
import { instanceAxios } from "@/services/auth/auth.service";

export const fetchRegistration = createAsyncThunk<
  IDataFromResolve,
  IDataFromForm
>(
  "userRegistration/fetchRegistration",
  async (dataFromForm, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: "POST",
        url: "users/",
        data: dataFromForm,
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchActivation = createAsyncThunk(
  "useActivation/fetchActivation",
  async (dataFromForm, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: "POST",
        url: "jwt/create/",
        data: dataFromForm,
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);
