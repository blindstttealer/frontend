'use client'

import { FC, FormEvent, useMemo, useState } from 'react'
import styles from './MyRecipies.module.scss'
import { useLazyGetUserDataQuery } from '@/store/features/user/user.actions'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import { TabData } from '@/components/ui/Tabs/Tabs.module'
import Subscriptions from '@/components/ui/Subscriptions/Subscriptions'
import Subscribers from '@/components/ui/Subscribers/Subscribers'
import { getUseMyRecipies } from '@/hooks/useMyRecipies'
import Button from '../Button/Button'
import { Loader } from '../Loader/Loader'

type MyRecipiesProps = {
  username?: string
}

const MyRecipies: FC<MyRecipiesProps> = ({ username }) => {
  const [date, setDate] = useState<string>('')
  const [trigger, { data, error, isError, isLoading, isFetching }] =
    useLazyGetUserDataQuery()

  const tabs: TabData[] = useMemo(
    () =>
      username
        ? [
            {
              label: `Рецепты`,
              Content: <RecipeList dispatcher={getUseMyRecipies(username)} />,
            },
            {
              label: `Мои подписки`,
              Content: <Subscriptions />,
            },
            {
              label: `Мои подписчики`,
              Content: <Subscribers />,
            },
          ]
        : [],
    [username],
  )

  const handleSelectSortByDate = () => {
    console.log('handleSelectSortByDate')
  }

  const handleSelectSortByComponents = () => {
    console.log('handleSelectSortByComponents')
  }

  //todo: После утверждения дизайна переделать на DatePicker
  const handleDateChange = (event: FormEvent<HTMLInputElement>) => {
    console.log('handleDateChange', event.currentTarget.value)
    setDate(event.currentTarget.value)
  }

  if (error) return <div>{String(error)}</div>

  if (isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.buttons}>
          <Button onClick={handleSelectSortByDate}>По дате</Button>
          <Button onClick={handleSelectSortByComponents}>
            По ингридиентам
          </Button>
        </div>

        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          title="calendar"
        />
      </div>

      {username && <RecipeList dispatcher={getUseMyRecipies(username)} />}
    </div>
  )
}

export default MyRecipies
