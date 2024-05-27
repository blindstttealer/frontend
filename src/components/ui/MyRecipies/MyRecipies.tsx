'use client'

import { FC } from 'react'
import styles from './MyRecipies.module.scss'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import { getUseRecipes } from '@/hooks/useRecipes'
import Button from '../Button/Button'
import DatePicker from '../DatePicker/DatePicker'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import {
  setDateSortMyRecipes,
  setSortMyRecipesMode,
} from '@/store/features/recipes/recipes.slice'

type MyRecipiesProps = {
  username?: string
}

const MyRecipies: FC<MyRecipiesProps> = ({ username }) => {
  const { sortMyRecipes, sortMyRecipesDate } = useAppSelector(
    (state) => state.recipesFeed,
  )
  const dispatch = useAppDispatch()

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.buttons}>
          <Button
            color="secondary"
            size="big"
            className={sortMyRecipes === 'date' ? styles.active : ''}
            onClick={() => dispatch(setSortMyRecipesMode('date'))}
          >
            По дате
          </Button>
          <Button
            color="secondary"
            size="big"
            className={sortMyRecipes === 'ingredients' ? styles.active : ''}
            onClick={() => dispatch(setSortMyRecipesMode('ingredients'))}
          >
            По ингредиентам
          </Button>
        </div>

        {sortMyRecipes === 'date' && (
          <DatePicker
            placeholder="Выберите нужную дату"
            value={
              (sortMyRecipesDate && new Date(sortMyRecipesDate)) || undefined
            }
            onChange={(date) =>
              dispatch(setDateSortMyRecipes(date?.toISOString().split('T')[0]))
            }
          />
        )}
      </div>

      {username && (
        <RecipeList
          dispatcher={getUseRecipes('feed', { username })}
          view="feed"
        />
      )}
    </div>
  )
}

export default MyRecipies
