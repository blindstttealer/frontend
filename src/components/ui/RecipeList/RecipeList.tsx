'use client'

import { FC, useEffect, useRef, useState } from 'react'
import styles from './RecipeList.module.scss'
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard'
import RecipeModify from '@/components/ui/RecipeModify/RecipeModify'
import { RecipeListDispatcher } from '@/hooks/useFavorites'
import EmptyRecipeList from './EmptyRecipeList'
import ListLoader from '../ListLoader/ListLoader'
import { ListLoadingError } from '../ListLoadingError/ListLoadingError'
import { RecipeView } from '@/store/features/recipes/recipes.slice'
import { id } from 'date-fns/locale/id'

const RecipeList: FC<{
  dispatcher: RecipeListDispatcher
  view: RecipeView
}> = ({ dispatcher, view }) => {
  const loaderRef = useRef(null)
  const [containerStyles, setContainerStyles] = useState<string[]>([
    styles.wrapper,
  ])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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

  const toggleIngredients = (index: number, id: number) => {
    console.log(index, id)
    setActiveIndex(id)
    // const updatedMenuData = menuData.map((item, i) => {
    //   if (i === index) {
    //     return { ...item, showIngredients: !item.showIngredients };
    //   }
    //   return item;
    // });
  }

  const handleToggle = (index: number) => {}

  return (
    <div className={styles.container}>
      <div className={containerStyles.join(' ')}>
        {recipies?.length ? (
          recipies?.map((recipe, index) => (
            <div key={recipe.id}>
              {activeIndex === recipe.id && (
                <div className={styles.container_popup}>
                  <RecipeModify
                    key={recipe.id}
                    recipe={recipe}
                    refreshListOnRemoveFromFavorites={true}
                  />
                </div>
              )}
              <button onClick={() => toggleIngredients(index, recipe.id)}>
                +
              </button>
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                refreshListOnRemoveFromFavorites={true}
              />
            </div>
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
