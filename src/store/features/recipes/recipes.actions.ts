import {createAsyncThunk} from "@reduxjs/toolkit"
import {BASE_URL, instanceAxios} from "@/services/auth/auth.service";
import {useAppSelector} from "@/store/features/hooks";
import {useState} from "react";
import axios from "axios";

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


export const fetchFeedPagesDynamic = createAsyncThunk(
    "recipes/feedDynamic",
    async ({sort, url}: { sort: string, url: string }, {rejectWithValue}) => {
        let urlObj = new URL(url);
        const path = urlObj?.pathname.substring(urlObj?.pathname.indexOf('feed')) + urlObj.search;
        try {
            if (sort === "default" || sort === "top") {
                const res = await axios({
                    method: "GET",
                    url: BASE_URL + path,
                });
                return {sort, data: res.data};
            } else if (sort === "subscribe") {
                const res = await instanceAxios({
                    method: "GET",
                    url: path,
                });
                return {sort, data: res.data};
            }
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);