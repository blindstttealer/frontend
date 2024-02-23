'use client'

import {useRouter} from 'next/navigation'
import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import React from "react";
import {fetchFeed} from "@/store/features/recipes/recipes.actions";
import styles from './page.module.scss'
import Layout from "@/components/layout/layout";
import RecipeCard from "@/components/ui/RecipeCard/RecipeCard";
import {IRecipe} from "@/store/features/recipes/recipes.types";
import {useRecipes} from "@/hooks/useRecipes";

export default function Home() {
    const recipes = useAppSelector((state) => state.recipesFeed)
    const recipe = useRecipes()


    return (
        <Layout>
            <div style={{padding: '0 20px'}}>
                <div className="container">
                    <div className={styles.recipesContainer}>
                        {recipes.isLoading ? <div>Loading...</div> :
                            recipe?.results.length ?
                                recipe?.results?.map((recipe: IRecipe) => (
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
