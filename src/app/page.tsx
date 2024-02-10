'use client'

import {useRouter} from 'next/navigation'
import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import React from "react";
import {fetchFeed} from "@/store/features/recipes/recipes.actions";
import {IRecipe, IRecipeInitialState} from "@/store/features/recipes/recipes.types";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    // @ts-ignore
    const recipes: IRecipeInitialState = useAppSelector((state) => state.recipesFeed)

    React.useLayoutEffect(() => {
        dispatch(fetchFeed())
    }, [dispatch])

    return (
        <div>
            <div className="container">
                <Sidebar/>
                {recipes.isLoading ? <div>Loading...</div> :
                    recipes.recipes?.feed?.results?.map((recipe) => (
                        <div key={recipe.id}>
                            {recipe.title}
                        </div>
                    ))}
            </div>
        </div>
    )
}
