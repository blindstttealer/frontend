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

interface IRecipeWithIngredients extends IRecipe {
  ingredients: any[]
  full_text: string
}
interface RecipeCardProps {
  recipe: IRecipeWithIngredients
  readonly?: boolean
  onClose?: () => void
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, readonly, onClose }) => {
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const { timeAgo, formattedDate } = useData(recipe.pub_date)
  const [recipe2, setRecipe2] = useState<IRecipeWithIngredients | null>(null)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [dataFetchError, setDataFetchError] = useState<boolean>(false)
  // const [addToFavorites] = useAddToFavoritesMutation()
  // const [removeFromFavorites] = useRemoveFromFavoritesMutation()

  const changeIsFavoriteHandler = () => {
    console.log('function work')
    // todo - надо ли для нового рецепта далать добавление его в избранное?
    // if (recipe.is_favorite) {
    //   removeFromFavorites(recipe.slug)
    //  } else {
    //    addToFavorites(recipe.slug)
    //  }
  }

  let slugForRequest = recipe.slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/recipe/${slugForRequest}/`,
          {
            method: 'GET',
            headers: {
              // Authorization: `${parsedCurrentAuth.token}`,
            },
          },
        )
        const data = await response.json()
        setRecipe2(data as IRecipeWithIngredients)
        setDataLoaded(true)
      } catch (error) {
        console.error(error)
        setDataFetchError(true)
      }
    }
    const timer = setTimeout(() => {
      if (!dataLoaded && !recipe2) {
        setDataFetchError(true)
      }
    }, 5000)

    fetchData()

    clearTimeout(timer)
  }, [])
  // console.log(recipe.slug, recipe2)

  const onPrinterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    changeIsFavoriteHandler()
  }

  return (
    <div>
      {!dataLoaded && !dataFetchError && <div>Data will arrive soon...</div>}
      {dataFetchError && <div>Error: Data could not be fetched.</div>}
      {dataLoaded && recipe2 && (
        <div className={styles.recipe}>
          <div className={styles.user}>
            <div className={styles.userWrapper}>
              <div className={styles.userLeft}>
                {/*проверка на аватарку*/}
                {/*{recipe?.author?.avatar ?*/}
                {/*    <Image src={recipe2.author.avatar} alt='avatar' width={30} height={30} draggable={false}/> :*/}
                {/*    <Image src='/img/recipe-card/profile.png' alt='avatar' width={30} height={30}*/}
                {/*           draggable={false}/>}*/}
                <Image
                  src="/img/recipe-card/profile.svg"
                  alt="avatar"
                  width={30}
                  height={30}
                  draggable={false}
                />
                <p>{recipe2.author.username}</p>
              </div>
              <div className={styles.userRight}>
                {/* <p>{formattedDate}</p> */}
                <p>{timeAgo}</p>
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
                  {recipe2.views_count}
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
                      {recipe2.reactions_count}
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
          <div className={styles.preview} onClick={onClose && onClose}>
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
            {recipe2.preview_image ? (
              <Image
                src={recipe2.preview_image}
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
            <p>{recipe2.title}</p>
          </div>

          <div className={styles.cockingTime_container}>
            <p className={styles.cockingTime}>Время приготовления</p>
            <div className={styles.hourPlusMinutes}>
              <div className={`${styles.minutes} ${styles.fromInput}`}>
                {recipe2.cooking_time}
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
                    <p
                      className={`${styles.name} ${styles.fromInput}`}
                      key={index}
                    >
                      {ingredient.name}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.unit}>Количество</div>
                <div>
                  {recipe2.ingredients.map((ingredient, index) => (
                    <p
                      className={`${styles.unit} ${styles.fromInput}`}
                      key={index}
                    >
                      {ingredient.amount}
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
                      {ingredient.unit}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cocking_container}>
            <p className={styles.cocking}>Приготовление</p>
            <div className={styles.full_text}>
              <p>{recipe2.full_text}</p>
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
              {recipe2.category.map((tag, index) => (
                <p key={index}>{tag.name}</p>
              ))}
            </div>
          </div>

          <div className={styles.tag_container}>
            <p className={styles.tag}>Хэштеги</p>
            <div className={`${styles.tag_input} ${styles.fromInput}`}>
              {recipe2.tag.map((tag, index) => (
                <p key={index}>{tag.name}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
