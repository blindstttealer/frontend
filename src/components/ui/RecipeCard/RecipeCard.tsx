import { FC } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import Image from 'next/image'
import styles from './RecipeCard.module.scss'
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
      <div className={styles.preview}>
        <button className={styles.previewPrinter}>
          <Image
            src="/img/recipe-card/printer.png"
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
        <p className={styles.previewTime}>{recipe.cooking_time} мин.</p>
      </div>
      <div className={styles.name}>
        <p>{recipe.title}</p>
        <p>{recipe.short_text}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
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
              src="/img/recipe-card/comment.svg"
              alt="comment button"
              width={24}
              height={24}
              draggable={false}
            />
            {recipe.comments_count}
          </button>
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
              src="/img/recipe-card/views.svg"
              alt="views"
              width={24}
              height={24}
              draggable={false}
            />
            {recipe.views_count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
