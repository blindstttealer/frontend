'use client'

import { FC, Fragment, useEffect, useRef, useState } from 'react'

import styles from './RecipeList.module.scss'
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard'
import { RecipeListDispatcher } from '@/hooks/useFavorites'
import EmptyRecipeList from './EmptyRecipeList'
import ListLoader from '@/components/ui/ListLoader/ListLoader'
import { ListLoadingError } from '@/components/ui/ListLoadingError/ListLoadingError'
import { RecipeView } from '@/store/features/recipes/recipes.slice'
import { useRouter } from 'next/navigation'

const RecipeList: FC<{
  dispatcher: RecipeListDispatcher
  view: RecipeView
}> = ({ dispatcher, view }) => {
  const loaderRef = useRef(null)
  const [containerStyles, setContainerStyles] = useState<string[]>([
    styles.wrapper,
  ])
  const router = useRouter()
  const { recipies, loadNextPageRef, isFetching, error } = dispatcher()

  const toggleIngredients = (slug: string) => {
    router.push(`/recipe/${slug}`)
  }

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
      newStyles.push('tile')
    }
    setContainerStyles(newStyles)
  }, [view])

  if (error) return <ListLoadingError error={error} />

  return (
    <div className={styles.container}>
      <div className={containerStyles.join(' ')}>
        {recipies?.length
          ? recipies?.map((recipe) => (
              <Fragment key={recipe.id}>
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onPreview={toggleIngredients}
                />
              </Fragment>
            ))
          : !isFetching && <EmptyRecipeList />}

        <div ref={loaderRef}>{isFetching && <ListLoader />}&nbsp;</div>
      </div>
    </div>
  )
}

export default RecipeList
