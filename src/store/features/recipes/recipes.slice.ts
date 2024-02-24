import {createSlice} from "@reduxjs/toolkit";
import {
    fetchFeed,
    fetchFeedActivityCount,
    fetchFeedPagesDynamic,
    fetchFeedSubscriptions
} from "@/store/features/recipes/recipes.actions";

interface IInitialState {
    recipes: {
        feed: {
            feed: null | any,
            result: null | any,
            nextPage: string | null
        },
        feedActivity: {
            feed: null | any,
            result: null | any,
            nextPage: string | null
        },
        feedSubscriptions: {
            feed: null | any,
            result: null | any,
            nextPage: string | null
        },
    },
    view: 'feed' | 'tile',
    sort: 'default' | 'top' | 'subscribe',
    isError: null | any,
    isLoading: boolean,
    flag: boolean,
}

const initialState: IInitialState = {
    recipes: {
        feed: {
            feed: null,
            result: null,
            nextPage: null
        },
        feedActivity: {
            feed: null,
            result: null,
            nextPage: null
        },
        feedSubscriptions: {
            feed: null,
            result: null,
            nextPage: null
        },
    },
    view: 'feed',
    sort: 'top',
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
            state.isLoading = true
            state.view = action.payload
            state.isLoading = false
        },
        setSortMode: (state, action) => {
            state.isLoading = true
            state.sort = action.payload
            state.isLoading = false
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
                state.recipes.feed.feed = action.payload
                state.recipes.feed.result = action.payload.results
                state.recipes.feed.nextPage = action.payload.next
            })
            .addCase(fetchFeed.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

            // fetch feed activity count

            .addCase(fetchFeedActivityCount.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFeedActivityCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.recipes.feedActivity.feed = action.payload
                state.recipes.feedActivity.result = action.payload.results
                state.recipes.feedActivity.nextPage = action.payload.next
            })
            .addCase(fetchFeedActivityCount.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

            // fetch feed subscriptions

            .addCase(fetchFeedSubscriptions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFeedSubscriptions.fulfilled, (state, action) => {
                state.isLoading = false
                state.recipes.feedSubscriptions.feed = action.payload
                state.recipes.feedSubscriptions.result = action.payload.results
                state.recipes.feedSubscriptions.nextPage = action.payload.next
            })
            .addCase(fetchFeedSubscriptions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

            // dynamic page fetch

            .addCase(fetchFeedPagesDynamic.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFeedPagesDynamic.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.sort === "default") {
                    state.recipes.feed.nextPage = action.payload.data.next
                    state.recipes.feed.result = [...state.recipes.feed.result, ...action.payload.data.results]
                } else if (action.payload.sort === "top") {
                    state.recipes.feedActivity.nextPage = action.payload.data.next
                    state.recipes.feedActivity.result = [...state.recipes.feedActivity.result, ...action.payload.data.results]
                } else if (action.payload.sort === "subscribe") {
                    state.recipes.feedSubscriptions.nextPage = action.payload.data.next
                    state.recipes.feedSubscriptions.result = [...state.recipes.feedSubscriptions.result, ...action.payload.data.results]
                }
            })
            .addCase(fetchFeedPagesDynamic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
    }
})

export const {setViewMode, setSortMode} = recipesFeed.actions;
export default recipesFeed.reducer