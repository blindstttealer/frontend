'use client'

import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import React, {useEffect, useState} from "react";
import styles from './page.module.scss'
import Layout from "@/components/layout/layout";
import RecipeCard from "@/components/ui/RecipeCard/RecipeCard";
import {IRecipe} from "@/store/features/recipes/recipes.types";
import {useRecipes} from "@/hooks/useRecipes";
import {useDispatch} from "react-redux";
import {
    fetchFeed,
    fetchFeedActivityCountPages,
    fetchFeedPages, fetchFeedPagesDynamic,
    fetchFeedSubscriptionsPages
} from "@/store/features/recipes/recipes.actions";

export default function Home() {
    const recipes = useAppSelector((state) => state.recipesFeed)
    const recipe = useRecipes()
    const dispatch = useAppDispatch();

    console.log("recipes: ", recipes)
    console.log("recipe: ", recipe)

    const [isScroll, setIsScroll] = useState(false); // Флаг загрузки

    useEffect(() => {
        const handleScroll = () => {
            // Проверка на загрузку и достижение нижней части страницы
            if (isScroll || window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

            setIsScroll(true); // Установка флага загрузки

            if (recipes.sort === "default") {
                dispatch(fetchFeedPages())
                    .finally(() => setIsScroll(false))
            } else if (recipes.sort === "top") {
                dispatch(fetchFeedActivityCountPages())
                    .finally(() => setIsScroll(false))
            } else if (recipes.sort === "subscribe") {
                dispatch(fetchFeedSubscriptionsPages())
                    .finally(() => setIsScroll(false))
            }

        };


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch, isScroll, recipes]);

    return (
        <Layout>
            <div style={{padding: '0 20px'}}>
                <div className="container">
                    <div className={styles.recipesContainer}>
                        {recipes.isLoading ? <div>Loading...</div> :
                            recipe?.length ?
                                recipe?.map((recipe: IRecipe) => (
                                    <div key={recipe.id}>
                                        <RecipeCard recipe={recipe}/>
                                    </div>
                                )) : <div>Рецептов нет :(</div>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
