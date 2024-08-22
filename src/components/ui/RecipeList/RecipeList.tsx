'use client'

import { FC, useEffect, useRef, useState } from 'react'

import styles from './RecipeList.module.scss'
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard'
import RecipeModify from '@/components/ui/RecipeModify/RecipeModify'
import { RecipeListDispatcher } from '@/hooks/useFavorites'
import EmptyRecipeList from './EmptyRecipeList'
import ListLoader from '@/components/ui/ListLoader/ListLoader'
import { ListLoadingError } from '@/components/ui/ListLoadingError/ListLoadingError'
import { RecipeView } from '@/store/features/recipes/recipes.slice'
import { IRecipe } from '@/store/features/recipes/recipes.types'

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

  const toggleIngredients = (id: number | null) => {
    console.log(id)
    setActiveIndex(id)
    // const updatedMenuData = menuData.map((item, i) => {
    //   if (i === index) {
    //     return { ...item, showIngredients: !item.showIngredients };
    //   }
    //   return item;
    // });
  }

  const handleToggle = (index: number) => {}

  const onlyOneRecipe = (recipe: IRecipe) => (
    <div className={styles.container}>
      <RecipeModify
        recipe={recipe}
        onClose={() => toggleIngredients(null)}
      />
    </div>
  )

  const listRecipes = () => (
    <div className={styles.container}>
      <div className={containerStyles.join(' ')}>
        {recipies?.length ? (
          recipies?.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPreview={toggleIngredients}
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

  const selectedRecipe = recipies?.find((e) => e.id === activeIndex)

  return activeIndex && selectedRecipe
    ? onlyOneRecipe(selectedRecipe)
    : listRecipes()
}

export default RecipeList
