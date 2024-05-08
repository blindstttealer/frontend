'use client'

import { FC, useEffect, useRef, useState } from 'react'
import styles from './RecipeList.module.scss'
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard'
import { RecipeListDispatcher } from '@/hooks/useFavorites'
import EmptyRecipeList from './EmptyRecipeList'
import ListLoader from '../ListLoader/ListLoader'
import { ListLoadingError } from '../ListLoadingError/ListLoadingError'
import { RecipeView } from '@/store/features/recipes/recipes.slice'

const RecipeList: FC<{
  dispatcher: RecipeListDispatcher
  view: RecipeView
}> = ({ dispatcher, view }) => {
  const loaderRef = useRef(null)
  const [containerStyles, setContainerStyles] = useState<string[]>([
    styles.wrapper,
  ])

  const { recipies, loadNextPageRef, isLoading, error } = dispatcher()

  // отслеживаем скроллинг и догружаем элементы списка
  useEffect(() => {
    // хранит ссылку на обсервер, чтоб потом отписаться при удалении компонента
    let observerRefValue = null

    // здесь отслеживается момент достижения скролом элемента с loaderRef
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      target.isIntersecting && loadNextPageRef.current()
    })

    // подписка на отслеживание
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
      observerRefValue = loaderRef.current
    }

    // отмена подписки на отслеживание (для устранения утечки памяти) при удалении компонента
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

  if (error) return <ListLoadingError error={error} />

  return (
    <div className={styles.container}>
      <div className={containerStyles.join(' ')}>
        {recipies?.length ? (
          recipies?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              refreshListOnRemoveFromFavorites={true}
            />
          ))
        ) : (
          <EmptyRecipeList />
        )}

        {isLoading && <ListLoader />}
      </div>

      {/* div обязателен в таком виде для догрузки элементов при достижении этого div в конце списка видимой части окна браузера */}
      <div ref={loaderRef}>&nbsp;</div>
    </div>
  )
}

export default RecipeList
