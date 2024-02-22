'use client'
import styles from './rightbar.module.scss'
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/store/features/hooks";
import {IRecipeInitialState} from "@/store/features/recipes/recipes.types";
import {setSortMode, setViewMode} from "@/store/features/recipes/recipes.slice";

export default function Rightbar() {
    const dispatch = useAppDispatch()
    const recipeState = useAppSelector((state) => state.recipesFeed)

    return (
        <div className={styles.rightbar}>
            <div className={styles.publish}>
                <button>
                    <span>Опубликовать</span>
                    <Image src='/img/rightbar/plus.png' alt='plus' width={22} height={22}/>
                </button>
            </div>
            <div className={styles.view}>
                <h3>Вид ленты</h3>
                <div>
                    <button className={recipeState.view === 'feed' ? styles.active : ''}
                            onClick={() => dispatch(setViewMode('feed'))}>Лента
                    </button>
                    <button className={recipeState.view === 'tile' ? styles.active : ''}
                            onClick={() => dispatch(setViewMode('tile'))}>Плитка
                    </button>
                </div>
            </div>
            <div className={styles.sort}>
                <h3>Сортировка</h3>
                <div>
                    <button className={recipeState.sort === 'default' ? styles.active : ''}
                            onClick={() => dispatch(setSortMode('default'))}>По времени
                    </button>
                    <button className={recipeState.sort === 'top' ? styles.active : ''}
                            onClick={() => dispatch(setSortMode('top'))}>Популярное
                    </button>
                    <button className={recipeState.sort === 'subscribe' ? styles.active : ''}
                            onClick={() => dispatch(setSortMode('subscribe'))}>По подпискам
                    </button>
                </div>
            </div>
            <div className={styles.topRecipe}>
                <h2>Рецепт дня</h2>
                {/*<Image src={} alt={}/>*/}
                <div>
                    <div className={styles.zaglushka}></div>
                    <span>Тыква с мёдом, чесноком, горчицей и лавровыми листами</span>
                </div>
            </div>
            <div className={styles.topAuthor}>
                <h2>Авторы дня</h2>
                <div className={styles.authors}>
                    <div className={styles.author}>
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#333'}}></div>
                        <span>username</span>
                    </div>
                    <div className={styles.author}>
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#333'}}></div>
                        <span>username</span>
                    </div>
                    <div className={styles.author}>
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#333'}}></div>
                        <span>username</span>
                    </div>
                </div>
            </div>
        </div>
    )
};