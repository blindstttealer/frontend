'use client'

import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import styles from './profile.module.scss'
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

export default function Profile() {
  const { data: loginedUsedData, isLoading: isLoadingPre } =
    useGetCurentUserDataQuery()
  // console.log('loginedUsedData', loginedUsedData)

  const [trigger, { data, error, isError, isLoading, isFetching }] =
    useLazyGetUserDataQuery()

  useEffect(() => {
    if (loginedUsedData?.username) {
      trigger(loginedUsedData.username)
    }
  }, [loginedUsedData, trigger])

  const tabs: TabData[] = useMemo(
    () =>
      loginedUsedData?.username
        ? [
            {
              label: `Рецепты`,
              Content: (
                <RecipeList
                  dispatcher={getUseMyRecipies(loginedUsedData?.username)}
                />
              ),
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
    [loginedUsedData?.username],
  )

  return (
    <Layout isSearch={true} rightbar={false}>
      <div className={`${styles.container} scroll scroll--left scroll__thin`}>
        {isLoadingPre || isLoading ? (
          <Loader />
        ) : (
          <div className={styles.userContainer}>
            <Image
              src={data?.avatar ?? '/img/user-big.svg'}
              width={120}
              height={120}
              alt="user image"
            />
            <div className={styles.userCard}>
              <h2>{data?.display_name}</h2>
              <div className={styles.userInfo}>
                <p>город {data?.city}</p>
                <p>{data?.bio}</p>
              </div>
            </div>
          </div>
        )}

        <Tabs tabs={tabs} />
      </div>
    </Layout>
  )
}
