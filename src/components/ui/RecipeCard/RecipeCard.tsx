import { FC } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import Image from 'next/image'
import styles from './RecipeCard.module.scss'
import cn from 'clsx'
import { useData } from '@/hooks/useData'
import Reactions from '@/components/ui/Reactions/Reactions'
import Popup from '@/components/ui/Popup/Popup'
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from '@/store/features/recipes/recipes.actions'

interface RecipeCardProps {
  recipe: IRecipe
  onPreview?: (id: number) => void
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, onPreview }) => {
  const { timeAgo, formattedDate } = useData(recipe.pub_date)
  const [addToFavorites] = useAddToFavoritesMutation()
  const [removeFromFavorites] = useRemoveFromFavoritesMutation()

  const changeIsFavoriteHandler = () => {
    if (recipe.is_favorite) {
      removeFromFavorites(recipe.slug)
    } else {
      addToFavorites(recipe.slug)
    }
  }

  const handlerOnTap = () => {
    onPreview && onPreview(recipe.id)
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
        <button
          className={cn(styles.previewTime, {
            [styles.tooltip]: true,
          })}
          onClick={handlerOnTap}
        >
          {recipe.cooking_time} мин.
          <span
            className={cn(styles.tooltiptext, {
              [styles.tooltipTop]: true,
            })}
          >
            нажмите для предварительного просмотра
          </span>
        </button>
        {/* <Popup
          Content={() => (
            <button className={cn(styles.previewTime, 
              'tooltip': true
            )} onClick={handlerOnTap}>
              {`${recipe.cooking_time} мин.`}
            </button>
          )}
          Tooltip={() => <div>нажмите для предварительного просмотра</div>}
        /> */}
      </div>

      <div className={styles.bottom}>
        <div className={styles.nameAndHash}>
          <div className={styles.name}>
            <p>{recipe.title}</p>
            <p>{recipe.short_text}</p>
          </div>
          <div className={styles.hash}>#hash #hash #hash #hash</div>
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
    </div>
  )
}

export default RecipeCard
