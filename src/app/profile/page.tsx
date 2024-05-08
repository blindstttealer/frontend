'use client'

import { useMemo } from 'react'
import styles from './profile.module.scss'
import { useGetCurentUserDataQuery } from '@/store/features/user/user.actions'
import Layout from '@/components/layout/layout'
import { Loader } from '@/components/ui/Loader/Loader'
import Tabs, { TabData } from '@/components/ui/Tabs/Tabs.module'
import MyRecipies from '@/components/ui/MyRecipies/MyRecipies'
import Subscriptions from '@/components/ui/Subscriptions/Subscriptions'
import Subscribers from '@/components/ui/Subscribers/Subscribers'
import UserCard from '@/components/ui/UserCard/UserCard'

export default function Profile() {
  const { data, isLoading, error } = useGetCurentUserDataQuery()

  const tabs: TabData[] = useMemo(
    () =>
      data?.username
        ? [
            {
              label: `Рецепты`,
              Content: <MyRecipies username={data?.username} />,
            },
            {
              label: `Мои подписки`,
              Content: <Subscriptions username={data?.username} />,
            },
            {
              label: `Мои подписчики`,
              Content: <Subscribers username={data?.username} />,
            },
          ]
        : [],
    [data?.username],
  )

  if (error) return <div>{String(error)}</div>

  if (isLoading) <Loader />

  return (
    <Layout isSearch={true} rightbar={false}>
      <div className={`${styles.container} scroll scroll--left scroll__thin`}>
        <UserCard username={data?.username} />
        <Tabs tabs={tabs} />
      </div>
    </Layout>
  )
}
