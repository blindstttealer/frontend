import {createSlice} from "@reduxjs/toolkit";
import {fetchFeed, fetchFeedActivityCount, fetchFeedSubscriptions} from "@/store/features/recipes/recipes.actions";

interface IInitialState {
    recipes: {
        feed: null | any,
        feedActivity: null | any,
        feedSubscriptions: null | any
    },
    view: 'feed' | 'tile',
    sort: 'default' | 'top' | 'subscribe',
    isError: null | any,
    isLoading: boolean,
    flag: boolean,
}

const initialState: IInitialState = {
    recipes: {
        feed: null,
        feedActivity: null,
        feedSubscriptions: null
    },
    view: 'feed',
    sort: 'default',
    isError: null,
    isLoading: false,
    flag: false,
};

const recipesFeed = createSlice({
    name: "recipesFeed",
    initialState,
    reducers: {
        // change sort and view
        setViewMode: (state, action) => {
            state.view = action.payload
        },
        setSortMode: (state, action) => {
            state.sort = action.payload
        }
    },
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

export const {setViewMode, setSortMode} = recipesFeed.actions;
export default recipesFeed.reducer