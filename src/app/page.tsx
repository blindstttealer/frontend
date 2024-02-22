'use client'

import {useRouter} from 'next/navigation'
import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import React from "react";
import {fetchFeed} from "@/store/features/recipes/recipes.actions";
import {IRecipe, IRecipeInitialState} from "@/store/features/recipes/recipes.types";
import styles from './page.module.scss'
import Layout from "@/components/layout/layout";
import RecipeCard from "@/components/ui/RecipeCard/RecipeCard";

export default function Home() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    // @ts-ignore
    const recipes = useAppSelector((state) => state.recipesFeed)

    React.useLayoutEffect(() => {
        dispatch(fetchFeed())
    }, [dispatch])

    return (
        <Layout>
            <div style={{padding: '0 20px'}}>
                <div className="container">
                    <div className={styles.recipesContainer}>
                        {recipes.isLoading ? <div>Loading...</div> :
                            // @ts-ignore
                            recipes.recipes?.feed?.results?.map((recipe) => (
                                <div key={recipe.id}>
                                    <RecipeCard recipe={recipe}/>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
