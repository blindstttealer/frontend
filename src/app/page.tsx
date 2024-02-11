'use client'

import {useRouter} from 'next/navigation'
import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import React from "react";
import {fetchFeed} from "@/store/features/recipes/recipes.actions";
import {IRecipeInitialState} from "@/store/features/recipes/recipes.types";
import styles from './page.module.scss'
import Layout from "@/components/layout/layout";

export default function Home() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    // @ts-ignore
    const recipes: IRecipeInitialState = useAppSelector((state) => state.recipesFeed)

    React.useLayoutEffect(() => {
        dispatch(fetchFeed())
    }, [dispatch])

    return (
        <Layout>
            <div>
                <div className="container">
                    <div className={styles.feed}>
                        <div className={styles.recipes}>
                            {recipes.isLoading ? <div>Loading...</div> :
                                recipes.recipes?.feed?.results?.map((recipe) => (
                                    <div key={recipe.id}>
                                        {recipe.title}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
