import {createAsyncThunk} from "@reduxjs/toolkit"
import {instanceAxios} from "@/services/auth/auth.service";

export const fetchFeed = createAsyncThunk(
    "recipes/feed",
    async (_, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "GET",
                url: "feed/",
            });
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);

export const fetchFeedActivityCount = createAsyncThunk(
    "recipes/feed=activity_count",
    async (_, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "GET",
                url: "feed/?ordering=-activity_count",
            });
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);

export const fetchFeedSubscriptions = createAsyncThunk(
    "recipes/feed=subscriptions",
    async (_, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "GET",
                url: "feed/?filter=subscriptions",
            });
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);
