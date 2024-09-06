'use client'

import styles from '../../mutationRecipe.module.scss'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
import EditRecipeForm from '@/components/forms/recipe/EditRecipeForm'

export default function EditRecipe({ params }: { params: { slug: string } }) {
  const { data, error } = useGetRecipeQuery(params.slug)

  if (error) return <div className={styles.wrongSlug}>Рецепт не найден</div>

  console.log('recipe data', JSON.stringify(data, null, 2));
  
  return (
    <div className={styles.wrapper}>
      <EditRecipeForm recipeData={data} />
    </div>
  )
}
