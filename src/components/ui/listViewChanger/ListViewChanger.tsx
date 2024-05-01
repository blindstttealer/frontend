'use client'
import styles from './ListViewChanger.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { setViewMode } from '@/store/features/recipes/recipes.slice'

export default function ListViewChanger() {
  const dispatch = useAppDispatch()
  const { view } = useAppSelector((state) => state.recipesFeed)

  return (
    <div className={styles.view}>
      <h3>Вид ленты</h3>
      <div>
        <button
          className={view === 'feed' ? styles.active : ''}
          onClick={() => dispatch(setViewMode('feed'))}
        >
          Лента
        </button>
        <button
          className={view === 'tile' ? styles.active : ''}
          onClick={() => dispatch(setViewMode('tile'))}
        >
          Плитка
        </button>
      </div>
    </div>
  )
}
