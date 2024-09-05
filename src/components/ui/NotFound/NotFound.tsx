'use client'

import styles from './notFound.module.scss'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'

export default function NotFound() {
  return (
    <div className={styles.container}>
      Страница не найдена
      <ButtonBack />
    </div>
  )
}
