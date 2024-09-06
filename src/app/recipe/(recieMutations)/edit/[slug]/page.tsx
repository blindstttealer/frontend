'use client'

import { useEffect } from 'react'

import styles from '../../mutationRecipe.module.scss'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'

export default function EditRecipe({ params }: { params: { slug: string } }) {
  const { data, isFetching, isLoading, error, status } = useGetRecipeQuery(
    params.slug,
  )

  useEffect(() => {
    console.log({ data, isFetching, isLoading, error, status })
  }, [data, error, isFetching, isLoading, status])

  if (error)
    return (
      <div className={styles.wrongSlug}>
        Рецепт не найден
      </div>
    )

  //todo поместить сюда форму изменения рецепта
  return (
    <div className={styles.wrapper}>
      Редактирование рецепта
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
