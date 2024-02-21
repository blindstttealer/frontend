import {IRecipe} from "@/store/features/recipes/recipes.types";
import Image from "next/image";
import styles from './RecipeCard.module.scss'
import {useData} from "@/hooks/useData";

interface IRecipeCard {
    recipe: IRecipe
}

export default function RecipeCard({recipe}: IRecipeCard) {
    const {timeAgo, formattedDate} = useData(recipe.pub_date)
    return (
        <div className={styles.recipe}>
            <div className={styles.header}>
                <button>
                    <Image src='/img/recipe-card/link.png' alt='link' width={28} height={28} draggable={false}/>
                </button>
                <button>
                    <Image src='/img/recipe-card/printer.png' alt='printer' width={28} height={28} draggable={false}/>
                </button>
            </div>
            <div className={styles.user}>
                <div className={styles.userLeft}>
                    {/*проверка на аватарку*/}
                    {/*{recipe?.author?.avatar ?*/}
                    {/*    <Image src={recipe.author.avatar} alt='avatar' width={30} height={30} draggable={false}/> :*/}
                    {/*    <Image src='/img/recipe-card/profile.png' alt='avatar' width={30} height={30}*/}
                    {/*           draggable={false}/>}*/}
                    <Image src='/img/recipe-card/profile.png' alt='avatar' width={30} height={30}/>
                    <p>
                        {recipe.author.username}
                    </p>
                </div>
                <div className={styles.userRight}>
                    <p>{formattedDate}</p>
                    <p>{timeAgo}</p>
                </div>
            </div>
            <div className={styles.preview}>
                {recipe.preview_image ?
                    <Image src={recipe.preview_image} height={300} alt='recipe image' draggable={false}
                           className={styles.notPreview}/> :
                    <div className={styles.notPreview}></div>}
                <Image src='/img/recipe-card/save.png' alt='save' width={26} height={26} draggable={false}
                       className={styles.previewSave}/>
                <p className={styles.previewTime}>
                    {recipe.cooking_time} минут
                </p>
            </div>
            <div className={styles.name}>
                <p>{recipe.title}</p>
                <p>{recipe.short_text}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    <button>
                        <Image src='/img/recipe-card/like.png' alt='like button' width={24} height={24}
                               draggable={false}/>
                        {recipe.total_reactions_count}
                    </button>
                    <button>
                        <Image src='/img/recipe-card/comment.png' alt='comment button' width={24} height={24}
                               draggable={false}/>
                        {recipe.total_comments_count}
                    </button>
                    <button>
                        <Image src='/img/recipe-card/share.png' alt='share button' width={24} height={24}
                               draggable={false}/>

                    </button>
                </div>
                <div className={styles.footerRight}>
                    <button>
                        <Image src='/img/recipe-card/repost.png' alt='repost button' width={24} height={24}
                               draggable={false}/>
                        {recipe.activity_count}
                    </button>
                    <button>
                        <Image src='/img/recipe-card/views.png' alt='views' width={24} height={24}
                               draggable={false}/>
                        {recipe.total_views_count}
                    </button>
                </div>
            </div>
        </div>
    )
}