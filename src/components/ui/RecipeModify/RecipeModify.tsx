import { FC, useState } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import Image from 'next/image'
import styles from './RecipeModify.module.scss'
import { useData } from '@/hooks/useData'
import { useAppDispatch } from '@/store/features/hooks'
import {
  fetchAddToFavorites,
  fetchRemoveFromFavorites,
} from '@/store/features/recipe/recipe.actions'
import { removeFromList } from '@/store/features/favorites/favorites.slice'
import Reactions from '@/components/ui/Reactions/Reactions'
import Popup from '@/components/ui/Popup/Popup'

interface RecipeCardProps {
  recipe: IRecipe
  refreshListOnRemoveFromFavorites?: boolean
}

const RecipeCard: FC<RecipeCardProps> = ({
  recipe,
  refreshListOnRemoveFromFavorites: refreshListOnDelete,
}) => {
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const { timeAgo, formattedDate } = useData(recipe.pub_date)
  const dispatch = useAppDispatch()

  const changeIsFavoriteHandler = () => {
    if (recipe.is_favorite) {
      dispatch(fetchRemoveFromFavorites(recipe.slug))
      refreshListOnDelete && dispatch(removeFromList({ slug: recipe.slug }))
    } else {
      dispatch(fetchAddToFavorites(recipe.slug))
    }
  }
  const recipe2 = {
    ingredients: [
      {
        name: 'Water',
        unit: 'литр',
        amount: 1,
      },
      {
        name: 'Сахар',
        unit: 'грамм',
        amount: 500,
      },
    ],
  }
  console.log(recipe.tag)

  return (
    <div className={styles.recipe}>
      <div className={styles.user}>
        <div className={styles.userWrapper}>
          <div className={styles.userLeft}>
            {/*проверка на аватарку*/}
            {/*{recipe?.author?.avatar ?*/}
            {/*    <Image src={recipe.author.avatar} alt='avatar' width={30} height={30} draggable={false}/> :*/}
            {/*    <Image src='/img/recipe-card/profile.png' alt='avatar' width={30} height={30}*/}
            {/*           draggable={false}/>}*/}
            <Image
              src="/img/recipe-card/profile.svg"
              alt="avatar"
              width={30}
              height={30}
              draggable={false}
            />
            <p>{recipe.author.username}</p>
          </div>
          <div className={styles.userRight}>
            <p>{formattedDate}</p>
            <p>{timeAgo}</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <button>
              <Image
                src="/img/recipe-card/views.svg"
                alt="views"
                width={24}
                height={24}
                draggable={false}
              />
              {recipe.views_count}
            </button>
            <Popup
              Content={() => (
                <button className={styles.like}>
                  <Image
                    src="/img/recipe-card/like.svg"
                    alt="like button"
                    width={24}
                    height={24}
                    draggable={false}
                  />
                  {recipe.reactions_count}
                </button>
              )}
              Tooltip={() => <Reactions slug={recipe.slug} />}
            />
            <button>
              <Image
                src="/img/recipe-card/share.svg"
                alt="share button"
                width={24}
                height={24}
                draggable={false}
              />
              0{/*тут должно быть количество репостов*/}
            </button>
          </div>
          <div className={styles.footerRight}>
            <button>
              <Image
                src="/img/recipe-card/comment.svg"
                alt="comment button"
                width={24}
                height={24}
                draggable={false}
              />
              {recipe.comments_count}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.preview}>
        <button className={styles.previewPrinter}>
          <Image
            src="/img/recipe-card/link.png"
            alt="printer"
            width={28}
            height={28}
            draggable={false}
          />
        </button>
        {recipe.preview_image ? (
          <Image
            src={recipe.preview_image}
            height={300}
            alt="recipe image"
            draggable={false}
            className={styles.notPreview}
          />
        ) : (
          <div className={styles.notPreview}></div>
        )}
        <button
          className={styles.previewSave}
          onClick={changeIsFavoriteHandler}
        >
          <Image
            src={`/img/recipe-card/${recipe.is_favorite ? 'save-filled.svg' : 'save.svg'}`}
            alt="save"
            width={26}
            height={26}
            draggable={false}
          />
        </button>
        {/* <p className={styles.previewTime}>{recipe.cooking_time} мин.</p> */}
      </div>

      <div className={styles.nameRecipe}>
        <p>{recipe.title}</p>
      </div>

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
              {recipe2.ingredients.map((ingredient, index) => (
                <p className={`${styles.name} ${styles.fromInput}`} key={index}>
                  {ingredient.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.unit}>Количество</div>
            <div>
              {recipe2.ingredients.map((ingredient, index) => (
                <p className={`${styles.unit} ${styles.fromInput}`} key={index}>
                  {ingredient.unit}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.amount}>Единица измерения</div>
            <div>
              {recipe2.ingredients.map((ingredient, index) => (
                <p
                  className={`${styles.amount} ${styles.fromInput}`}
                  key={index}
                >
                  {ingredient.amount}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cocking_container}>
        <p className={styles.cocking}>Приготовление</p>
        <div className={styles.full_text}>
          <p>{recipe.title}</p>
          <button
            onClick={(e) => {
              e.preventDefault(), setShowMediaIcons(!showMediaIcons)
            }}
            className={styles.cockingButton}
          >
            +
          </button>
          {showMediaIcons && (
            <div className={styles.mediaIcons}>
              <Image
                src="/img/add-new-recipe/add_photo.svg"
                alt="add-image"
                width={24}
                height={24}
              />
              <Image
                alt="add-image"
                src="/img/add-new-recipe/add_video.svg"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.category_container}>
        <p className={styles.category}>Категории</p>
        <div className={`${styles.category_input} ${styles.fromInput}`}>
          {recipe.tag.map((tag, index) => (
            <p key={index}>{tag.name}</p>
          ))}
        </div>
      </div>

      <div className={styles.tag_container}>
        <p className={styles.tag}>Хэштеги</p>
        <div className={`${styles.tag_input} ${styles.fromInput}`}>
          {recipe.tag.map((tag, index) => (
            <p key={index}>{tag.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
