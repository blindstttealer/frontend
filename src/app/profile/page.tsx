'use client'

import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import styles from './profile.module.scss'
import {
  useGetCurentUserDataQuery,
  useLazyGetUserDataQuery,
} from '@/store/features/user/user.actions'
import Layout from '@/components/layout/layout'
import { Loader } from '@/components/ui/Loader/Loader'
import Tabs, { TabData } from '@/components/ui/Tabs/Tabs.module'
import MyRecipies from '@/components/ui/MyRecipies/MyRecipies'
import Subscriptions from '@/components/ui/Subscriptions/Subscriptions'
import Subscribers from '@/components/ui/Subscribers/Subscribers'
import Button from '@/components/ui/Button/Button'

export default function Profile() {
  const { data: loginedUsedData, isLoading: isLoadingPre } =
    useGetCurentUserDataQuery()

  const [trigger, { data, error, isError, isLoading, isFetching }] =
    useLazyGetUserDataQuery()

    // console.log('loginedUsedData', data);
    

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
              Content: <MyRecipies username={loginedUsedData?.username} />,
            },
            {
              label: `Мои подписки`,
              Content: <Subscriptions username={loginedUsedData?.username}/>,
            },
            {
              label: `Мои подписчики`,
              Content: <Subscribers username={loginedUsedData?.username}/>,
            },
          ]
        : [],
    [loginedUsedData?.username],
  )

  const editProfileHandler = () => {
    console.log('edit profile')
  }

  return (
    <Layout isSearch={true} rightbar={false}>
      <div className={`${styles.container} scroll scroll--left scroll__thin`}>
        {isLoadingPre || isLoading ? (
          <Loader />
        ) : (
          <div className={styles.userContainer}>
            <div className={styles.userFooter}>
              <Image
                src={data?.avatar ?? '/img/user-big.svg'}
                priority={true}
                width={120}
                height={120}
                alt="user image"
              />
              <Button onClick={editProfileHandler}>
                Редактировать профиль
              </Button>
            </div>
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
