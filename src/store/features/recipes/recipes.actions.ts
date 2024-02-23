import {createAsyncThunk} from "@reduxjs/toolkit"
import {instanceAxios} from "@/services/auth/auth.service";
import {useAppSelector} from "@/store/features/hooks";
import {useState} from "react";

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

export const fetchFeedPages = createAsyncThunk(
    'recipes/fetchFeedPages',
    async (_, {rejectWithValue}) => {
        try {
            // Обработка URL для извлечения нужной части
            const recipes = useAppSelector((state) => state.recipesFeed.recipes.feed)
            if (!recipes.nextPage) return
            let urlObj = new URL(recipes.nextPage);
            const path = urlObj?.pathname.substring(urlObj?.pathname.indexOf('feed')) + urlObj.search;
            const res = await instanceAxios({
                method: "GET",
                url: path,
            });
            return res.data
        } catch (error) {
            // @ts-ignore
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchFeedActivityCountPages = createAsyncThunk(
    'recipes/fetchFeedActivityCountPages',
    async (_, {rejectWithValue}) => {
        try {
            // Обработка URL для извлечения нужной части
            const recipes = useAppSelector((state) => state.recipesFeed.recipes.feedActivity)
            if (!recipes.nextPage) return
            let urlObj = new URL(recipes.nextPage);
            const path = urlObj?.pathname.substring(urlObj?.pathname.indexOf('feed')) + urlObj.search;
            const res = await instanceAxios({
                method: "GET",
                url: path,
            });
            return res.data
        } catch (error) {
            // @ts-ignore
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFeedSubscriptionsPages = createAsyncThunk(
    'recipes/fetchFeedSubscriptionsPages',
    async (_, {rejectWithValue}) => {
        try {
            // Обработка URL для извлечения нужной части
            const recipes = useAppSelector((state) => state.recipesFeed.recipes.feedSubscriptions)
            if (!recipes.nextPage) return
            let urlObj = new URL(recipes.nextPage);
            const path = urlObj?.pathname.substring(urlObj?.pathname.indexOf('feed')) + urlObj.search;
            const res = await instanceAxios({
                method: "GET",
                url: path,
            });
            return res.data
        } catch (error) {
            // @ts-ignore
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFeedPagesDynamic = createAsyncThunk(
    "recipes/feedDynamic",
    async (_, {rejectWithValue}) => {
        try {
            const res = await instanceAxios({
                method: "GET",
                url: "feed/?page=2",
            });
            console.log(res)
            return res.data;
        } catch (err) {
            // @ts-ignore
            return rejectWithValue(err?.response?.data);
        }
    }
);