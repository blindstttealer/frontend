'use client'
import styles from './rightbar.module.scss'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { setSortMode } from '@/store/features/recipes/recipes.slice'
import ListViewChanger from '../../ui/listViewChanger/ListViewChanger'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import { useAuth } from '@/hooks/useAuth'

export default function Rightbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const recipeState = useAppSelector((state) => state.recipesFeed)
  const { isAuth } = useAuth()

  const handleSortBySubscribe = () => {
    if (isAuth) {
      dispatch(setSortMode('subscribe'))
    } else {
      alert('Для доступа к этой функции надо авторизоваться')
    }
  }

  return (
    <div className={styles.rightbar}>
      <div className={styles.publish}>
        <Button
          color="secondary"
          size="big"
          className={recipeState.sort === 'top' ? styles.active : ''}
          onClick={() => router.push('add-new-recipe')}
        >
          Опубликовать
          <Image
            src="/img/rightbar/plus.png"
            alt="plus"
            width={22}
            height={22}
          />
        </Button>
      </div>
      <ListViewChanger />
      <div className={styles.sort}>
        <h3>Сортировка</h3>
        <div>
          <Button
            color="secondary"
            size="medium"
            className={recipeState.sort === 'top' ? styles.active : ''}
            onClick={() => dispatch(setSortMode('top'))}
          >
            Популярное
          </Button>
          <Button
            color="secondary"
            size="medium"
            className={recipeState.sort === 'default' ? styles.active : ''}
            onClick={() => dispatch(setSortMode('default'))}
          >
            По времени
          </Button>
          <Button
            color="secondary"
            size="medium"
            className={recipeState.sort === 'subscribe' ? styles.active : ''}
            onClick={handleSortBySubscribe}
          >
            По подпискам
          </Button>
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
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
              }}
            ></div>
            <span>username</span>
          </div>
          <div className={styles.author}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
              }}
            ></div>
            <span>username</span>
          </div>
          <div className={styles.author}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
              }}
            ></div>
            <span>username</span>
          </div>
        </div>
      </div>
    </div>
  )
}
