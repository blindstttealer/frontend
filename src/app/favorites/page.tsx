'use client'
import Layout from '@/components/layout/layout'
import styles from './favorites.module.scss'
import { useFavorites } from '@/hooks/useFavorites'
import ListViewChanger from '@/components/ui/listViewChanger/ListViewChanger'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import { useAppSelector } from '@/store/features/hooks'

export default function Favorites() {
  const { view } = useAppSelector((state) => state.recipesFeed)

  return (
    <Layout isSearch={true} rightbar={false}>
      <div className={`${styles.recipesContainer} scroll scroll--left scroll__thin`}>
        <RecipeList dispatcher={useFavorites} view={view}/>
      </div>
      <div className={styles.rightbar}>
        <ListViewChanger />
      </div>
    </Layout>
  )
}
