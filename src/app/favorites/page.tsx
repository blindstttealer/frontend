'use client'
import Layout from "@/components/layout/layout";
import RecipeCard from "@/components/ui/RecipeCard/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";
import { IRecipe } from "@/store/features/recipes/recipes.types";
import styles from "./favorites.module.scss"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/features/hooks";
import { fetchGetFavorites } from "@/store/features/favorites/favorite.actions";

export default function Favorites() {
    const dispatch = useAppDispatch()
    const { favorite } = useAppSelector(state => state.favorites)
    useEffect(() => {
        dispatch(fetchGetFavorites())
    }, [dispatch])
    const recipe = useRecipes()
    return (
        <Layout isSearch={true} rightbar={true}>
            <div style={{ padding: '0 20px' }}>
                <div className="container">
                    <div className={styles.recipesContainer}>
                        <p>
                            {favorite?.detail}
                            {/* {recipe !== null ? recipe.map((item: IRecipe) => <div key={item.id}><RecipeCard recipe={item} /></div>) : <p>Loading...</p>} */}
                        </p>

                    </div>
                </div>
            </div>
        </Layout>

    )
}
