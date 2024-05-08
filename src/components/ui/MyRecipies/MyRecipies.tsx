'use client'

import Image from 'next/image'
import { FC, useEffect, useMemo } from 'react'
import styles from './MyRecipies.module.scss'
import {
  useGetCurentUserDataQuery,
  useLazyGetUserDataQuery,
} from '@/store/features/user/user.actions'
// import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout/layout'
// import { Loader } from '@/components/ui/Loader/Loader'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import Tabs, { TabData } from '@/components/ui/Tabs/Tabs.module'
import Subscriptions from '@/components/ui/Subscriptions/Subscriptions'
import Subscribers from '@/components/ui/Subscribers/Subscribers'
import { getUseMyRecipies } from '@/hooks/useMyRecipies'
import { Loader } from '@/components/ui/Loader/Loader'
import ListLoader from '../ListLoader/ListLoader'
import Button from '../Button/Button'

type MyRecipiesProps = {
  username?: string
}

const MyRecipies: FC<MyRecipiesProps> = ({ username }) => {
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

  const selectSortByDateHandler = () => {
    console.log('selectSortByDateHandler')
  }

  const selectSortByComponentsHandler = () => {
    console.log('selectSortByComponentsHandler')
  }

  if (error) return <div>{String(error)}</div>

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.buttons}>
          <Button onClick={selectSortByDateHandler}>По дате</Button>
          <Button onClick={selectSortByComponentsHandler}>
            По ингридиентам
          </Button>
        </div>
        calnendar
      </div>

      {username && <RecipeList dispatcher={getUseMyRecipies(username)} />}
    </div>
  )
}

export default MyRecipies
