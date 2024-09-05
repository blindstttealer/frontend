'use client'

import { useEffect } from 'react'

import styles from '../../recipe.module.scss'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'

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
        <ButtonBack />
      </div>
    )

  //todo поместить сюда форму изменения рецепта
  return (
    <>
      Редактирование рецепта
      <pre style={{ display: 'block', fontSize: '10pt' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}
