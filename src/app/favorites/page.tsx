'use client'
import Layout from '@/components/layout/layout'
import styles from './favorites.module.scss'
import { useFavorites } from '@/hooks/useFavorites'
import ListViewChanger from '@/components/ui/listViewChanger/ListViewChanger'
import RecipeList from '@/components/ui/RecipeList/RecipeList'

export default function Favorites() {
  return (
    <Layout isSearch={true} rightbar={false}>
      <div className={styles.recipesContainer}>
        <RecipeList dispatcher={useFavorites} />
      </div>
      <div className={styles.rightbar}>
        <ListViewChanger />
      </div>
    </Layout>
  )
}
