'use client'
import { FC } from 'react'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'
import styles from './ingredientsShowEndAdd.module.scss'

interface IngredientsShowEndAddProps {
  recipe2: IRecipeWithIngredients
}
interface RecipeCardProps {
  recipe: IRecipeWithIngredients
  readonly?: boolean
  onClose?: () => void
  slug: string
  pub_date: string
}

const ingredientsShowEndAdd: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className={styles.component_container}>
      <div className={styles.cockingTime_container}>
        <p className={styles.cockingTime}>Время приготовления</p>
        <div className={styles.hourPlusMinutes}>
          <div className={`${styles.minutes} ${styles.fromInput}`}>
            {recipe.cooking_time}
            минут
          </div>
        </div>
      </div>

      <div className={styles.ingredients_container}>
        <p className={styles.ingredients}>Ингредиенты</p>
        <div className={styles.inner_descriptionIngredients}>
          <div>
            <div className={styles.name}>Название</div>
            <div>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <p className={`${styles.name} ${styles.fromInput}`} key={index}>
                  {ingredient.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.unit}>Количество</div>
            <div>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <p className={`${styles.unit} ${styles.fromInput}`} key={index}>
                  {ingredient.amount}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.amount}>Единица измерения</div>
            <div>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <p
                  className={`${styles.amount} ${styles.fromInput}`}
                  key={index}
                >
                  {ingredient.unit}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ingredientsShowEndAdd
