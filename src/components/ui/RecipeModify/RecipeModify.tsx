import { FC, useState, useEffect } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import Image from 'next/image'
import styles from './RecipeModify.module.scss'
import { useData } from '@/hooks/useData'
// import {
//   useAddToFavoritesMutation,
//   useRemoveFromFavoritesMutation,
// } from '@/store/features/recipes/recipes.actions'
import Reactions from '@/components/ui/Reactions/Reactions'
import Popup from '@/components/ui/Popup/Popup'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
import IngredientsShowEndAdd from '@/components/ui/RecipeComponents/IngredientsShowEndAdd/ingredientsShowEndAdd'

interface IRecipeWithIngredients extends IRecipe {
  ingredients: any[]
  full_text: string
}
interface RecipeCardProps {
  recipe: IRecipeWithIngredients
  readonly?: boolean
  onClose?: () => void
  slug: string
  pub_date: string
}

const RecipeModify: FC<RecipeCardProps> = ({ recipe }) => {
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  // const { timeAgo, formattedDate } = useData(pub_date)

  const changeIsFavoriteHandler = () => {
    console.log('function work')
    // todo - надо ли для нового рецепта далать добавление его в избранное?
    // if (recipe.is_favorite) {
    //   removeFromFavorites(recipe.slug)
    //  } else {
    //    addToFavorites(recipe.slug)
    //  }
  }

  const onPrinterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    changeIsFavoriteHandler()
  }

  // const { data: recipe, isFetching, isError, error } = useGetRecipeQuery(slug)

  // if (isFetching) return 'Loading'

  // if (isError)
  //   return <div>Error: Data could not be fetched: {String(error)}</div>

  if (recipe)
    return (
      <div>
        {/* {recipe && ( */}
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
                {/* <p>{formattedDate}</p> */}
                {/* <p>{timeAgo}</p> */}
              </div>
            </div>
          </div>
          {/* string of views likes and need to add edit and delete */}
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
                </button>
              </div>
            </div>
          </div>
          {/* photo of the dishes that you need to add an icon in the lower left corner */}
          <div className={styles.preview}>
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className={styles.previewSave}
            >
              <Image
                src="/img/recipe-card/link.png"
                alt="save"
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
            <button className={styles.previewPrinter} onClick={onPrinterClick}>
              <Image
                src="/img/recipe-card/printer.png"
                alt="printer"
                width={26}
                height={26}
                draggable={false}
              />
            </button>
          </div>

          <div className={styles.nameRecipe}>
            <p>{recipe.title}</p>
          </div>

          <IngredientsShowEndAdd recipe={recipe} slug={''} pub_date={''} />

          <div className={styles.cocking_container}>
            <p className={styles.cocking}>Приготовление</p>
            <div className={styles.full_text}>
              <p>{recipe.full_text}</p>
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
              {recipe.category.map((tag: any, index: any) => (
                <p key={index}>{tag.name}</p>
              ))}
            </div>
          </div>

          <div className={styles.tag_container}>
            <p className={styles.tag}>Хэштеги</p>
            <div className={`${styles.tag_input} ${styles.fromInput}`}>
              {recipe.tag.map((tag: any, index: any) => (
                <p key={index}>{tag.name}</p>
              ))}
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    )
}

export default RecipeModify
