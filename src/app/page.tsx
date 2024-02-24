'use client'

import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import React, {useEffect, useState} from "react";
import styles from './page.module.scss'
import Layout from "@/components/layout/layout";
import RecipeCard from "@/components/ui/RecipeCard/RecipeCard";
import {IRecipe} from "@/store/features/recipes/recipes.types";
import {useRecipes} from "@/hooks/useRecipes";
import {fetchFeedPagesDynamic} from "@/store/features/recipes/recipes.actions";
import Image from "next/image";
import {Loader} from "@/components/ui/Loader/Loader";
import {useAuth} from "@/hooks/useAuth";

export default function Home() {
    const {isAuth} = useAuth()
    const recipe = useRecipes()
    const recipes = useAppSelector((state) => state.recipesFeed)
    const dispatch = useAppDispatch();

    // console.log("recipes: ", recipes)
    // console.log("recipe: ", recipe)

    const [isScroll, setIsScroll] = useState(false); // Флаг загрузки

    useEffect(() => {
        const handleScroll = () => {
            // Проверка на загрузку и достижение нижней части страницы
            if (isScroll || window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

            setIsScroll(true); // Установка флага загрузки


            if (recipes.sort === "default") {
                if (recipes.recipes.feed.nextPage) dispatch(fetchFeedPagesDynamic({
                    sort: recipes.sort,
                    url: recipes.recipes.feed.nextPage
                }))
                    .finally(() => setIsScroll(false))
            } else if (recipes.sort === "top") {
                if (recipes.recipes.feedActivity.nextPage) dispatch(fetchFeedPagesDynamic({
                    sort: recipes.sort,
                    url: recipes.recipes.feedActivity.nextPage
                }))
                    .finally(() => setIsScroll(false))
            } else if (isAuth && recipes.sort === "subscribe") {
                if (recipes.recipes.feedSubscriptions.nextPage) dispatch(fetchFeedPagesDynamic({
                    sort: recipes.sort,
                    url: recipes.recipes.feedSubscriptions.nextPage
                }))
                    .finally(() => setIsScroll(false))
            }

        }


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch, isScroll, recipes]);

    return (
        <Layout>
            <div style={{padding: '0 20px'}}>
                <div className="container">
                    <div className={styles.recipesContainer}>
                        {recipe?.length &&
                            recipe?.map((recipe: IRecipe) => (
                                <div key={recipe.id}>
                                    <RecipeCard recipe={recipe}/>
                                </div>
                            ))}
                        {recipes?.isLoading ? <Loader/>
                            : recipes.sort === "subscribe" && !isAuth ? <div>Авторизуйтесь :(</div> :
                                !recipe?.length &&
                                <div>Рецептов нет :(</div>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
