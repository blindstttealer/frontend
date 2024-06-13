'use client'

import { useMemo } from 'react'
import { useAppSelector } from '@/store/features/hooks'
import styles from './page.module.scss'
import Layout from '@/components/layout/layout'
import {
  getUseRecipes,
  RecipeListDispatcher,
  RecipeListVariant,
} from '@/hooks/useRecipes'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import Rightbar from '@/components/layout/rightbar/rightbar'

export default function Home() {
  const { view, sort } = useAppSelector((state) => state.recipesFeed)

  const dispatcherByVariant: Record<RecipeListVariant, RecipeListDispatcher> =
    useMemo(
      () => ({
        top: getUseRecipes('feed', { ordering: '-activity_count' }),
        default: getUseRecipes('feed'),
        subscribe: getUseRecipes('feed', { filter: 'subscriptions' }),
      }),
      [],
    )

  return (
    <Layout isSearch={true}>
      <div className={styles.container}>
        <div
          className={`${styles.recipes} scroll scroll--left scroll__thin`}
          id="wrapper"
        >
          {/* div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера */}
          <div>
            {dispatcherByVariant[sort] && (
              <RecipeList dispatcher={dispatcherByVariant[sort]} view={view} />
            )}
          </div>
        </div>
        <Rightbar />
      </div>
    </Layout>
  )
}
