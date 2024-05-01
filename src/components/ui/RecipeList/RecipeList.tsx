'use client'
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import styles from './RecipeList.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/store/features/hooks'
import { RecipeListDispatcher } from '@/hooks/useFavorites'

const RecipeList: FC<{
  dispatcher: RecipeListDispatcher
}> = ({ dispatcher }) => {
  const loaderRef = useRef(null)
  const { view } = useAppSelector((state) => state.recipesFeed)
  const [containerStyles, setContainerStyles] = useState<string[]>([
    styles.wrapper,
  ])

  const { recipies, loadNextPageRef, isLoading, status, error } =
    dispatcher()

  // отслеживаем скроллинг и догружаем элементы списка
  useEffect(() => {
    let observerRefValue = null

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      target.isIntersecting && loadNextPageRef.current()
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
      observerRefValue = loaderRef.current
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue)
    }
  }, [loadNextPageRef])

  useEffect(() => {
    const newStyles = [styles.wrapper]
    if (view === 'tile') {
      newStyles.push(styles.tile)
    }
    setContainerStyles(newStyles)
  }, [view])

  return (
    <div className={styles.container}>
      {status === 'error' && <p>error {error}</p>}

      <div className={containerStyles.join(' ')}>
        {recipies?.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div ref={loaderRef}>{isLoading && <p>Loading...</p>}</div>
    </div>
  )
}

export default RecipeList
