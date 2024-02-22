'use client'
import styles from './rightbar.module.scss'
import Image from "next/image";

export default function Rightbar() {
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
                    <button>Лента</button>
                    <button>Плитка</button>
                </div>
            </div>
            <div className={styles.sort}>
                <h3>Сортировка</h3>
                <div>
                    <button>Популярное</button>
                    <button>По времени</button>
                    <button>По подпискам</button>
                </div>
            </div>
            <div className={styles.topRecipe}>
                <h2>Рецепт дня</h2>
                {/*<Image src={} alt={}/>*/}
                <div className={styles.zaglushka}></div>
                <span>Тыква с мёдом, чесноком, горчицей и лавровыми листами</span>
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