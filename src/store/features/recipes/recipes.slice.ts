import {createSlice} from "@reduxjs/toolkit";
import {fetchFeed, fetchFeedActivityCount, fetchFeedSubscriptions} from "@/store/features/recipes/recipes.actions";
import {IRecipe} from "@/store/features/recipes/recipes.types";

const initialState = {
    recipes: {
        feed: null,
        feedActivity: null,
        feedSubscriptions: null
    },
    isError: null,
    isLoading: false,
    flag: false,
};

const recipesFeed = createSlice({
    name: "recipesFeed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // fetch feed

            .addCase(fetchFeed.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.isLoading = false
                state.recipes.feed = action.payload
            })
            .addCase(fetchFeed.rejected, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.isError = action.payload
            })

            // fetch feed activity count

            .addCase(fetchFeedActivityCount.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFeedActivityCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.recipes.feedActivity = action.payload
            })
            .addCase(fetchFeedActivityCount.rejected, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.isError = action.payload
            })

            // fetch feed subscriptions

            .addCase(fetchFeedSubscriptions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFeedSubscriptions.fulfilled, (state, action) => {
                state.isLoading = false
                state.recipes.feedSubscriptions = action.payload
            })
            .addCase(fetchFeedSubscriptions.rejected, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.isError = action.payload
            })
    }
})

export default recipesFeed.reducer