import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import {fetchFeed, fetchFeedActivityCount, fetchFeedSubscriptions} from "@/store/features/recipes/recipes.actions";
import {useEffect} from "react";

export const useRecipes = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(state => state.recipesFeed);

    useEffect(() => {
        if (recipes.sort === 'default' && recipes.recipes.feed === null) {
            dispatch(fetchFeed());
        } else if (recipes.sort === 'top' && recipes.recipes.feedActivity === null) {
            dispatch(fetchFeedActivityCount());
        } else if (recipes.sort === 'subscribe' && recipes.recipes.feedSubscriptions === null) {
            dispatch(fetchFeedSubscriptions());
        }
    }, [dispatch, recipes]);

    if (recipes.sort === 'default') {
        return recipes.recipes.feed;
    } else if (recipes.sort === 'top') {
        return recipes.recipes.feedActivity;
    } else if (recipes.sort === 'subscribe') {
        return recipes.recipes.feedSubscriptions;
    }
};