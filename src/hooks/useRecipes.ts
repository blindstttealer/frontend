import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import {fetchFeed, fetchFeedActivityCount, fetchFeedSubscriptions} from "@/store/features/recipes/recipes.actions";
import {useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";

export const useRecipes = () => {
    const {isAuth} = useAuth()
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(state => state.recipesFeed);

    useEffect(() => {
        if (recipes.sort === 'default' && recipes.recipes.feed.result === null) {
            dispatch(fetchFeed());
        } else if (recipes.sort === 'top' && recipes.recipes.feedActivity.result === null) {
            dispatch(fetchFeedActivityCount());
        } else if (recipes.sort === 'subscribe' && recipes.recipes.feedSubscriptions.result === null && isAuth) {
            dispatch(fetchFeedSubscriptions());
        }
    }, [dispatch, recipes]);

    if (recipes.sort === 'default') {
        return recipes.recipes.feed.result;
    } else if (recipes.sort === 'top') {
        return recipes.recipes.feedActivity.result;
    } else if (recipes.sort === 'subscribe') {
        return recipes.recipes.feedSubscriptions.result;
    }
};