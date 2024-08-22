'use client'
import styles from './favorites.module.scss'
import { useFavorites } from '@/hooks/useFavorites'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import { useAppSelector } from '@/store/features/hooks'

export default function Favorites() {
  const { view } = useAppSelector((state) => state.recipesFeed)

  return (
    <>
      <div
        className={`${styles.recipesContainer} scroll scroll--left scroll__thin`}
      >
        {/* div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера */}
        <div>
          <RecipeList dispatcher={useFavorites} view={view} />
        </div>
      </div>
      <div className={styles.rightbar}>
        <ListViewChanger />
      </div>
    </>
  )
}
