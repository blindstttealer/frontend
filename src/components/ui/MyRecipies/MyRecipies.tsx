'use client'

import { FC, useState } from 'react'
import styles from './MyRecipies.module.scss'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import { getUseRecipes } from '@/hooks/useRecipes'
import Button from '../Button/Button'
import DatePicker from '../DatePicker/DatePicker'

type MyRecipiesProps = {
  username?: string
}

const MyRecipies: FC<MyRecipiesProps> = ({ username }) => {
  const [date, setDate] = useState<string>('')

  const handleSelectSortByDate = () => {
    console.log('handleSelectSortByDate')
  }

  const handleSelectSortByComponents = () => {
    console.log('handleSelectSortByComponents')
  }

  const handleDateChange = (newDate: string) => {
    console.log('handleDateChange', newDate)
    setDate(newDate)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.buttons}>
          <Button onClick={handleSelectSortByDate}>По дате</Button>
          <Button onClick={handleSelectSortByComponents}>
            По ингридиентам
          </Button>
        </div>

        <DatePicker
          placeholder="Выберите нужную дату"
          value={date}
          onChange={handleDateChange}
        />
      </div>

      {username && (
        <RecipeList
          dispatcher={getUseRecipes('feed', { username })}
          view="feed"
        />
      )}
    </div>
  )
}

export default MyRecipies
