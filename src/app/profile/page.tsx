"use client"

import React from 'react'
import styles from './profile.module.scss'
import Button from '@/components/ui/Button/Button'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { fetchDataUser } from '@/store/features/user/user.actions'
import { useAuth } from '@/hooks/useAuth'

export default function Profile() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const dataUser = useAppSelector(state => state.userDateMe);
    console.log("ошибка из профиля", dataUser.isError);

    // @ts-ignore
    dataUser?.isError?.code && dataUser.isError.code === "token_not_valid" ? router.push('/activate-page') : null

    // let refresh: string | null = null;

    // if (typeof window !== "undefined") {
    //     refresh = localStorage.getItem("refresh_token_svd")
    // }

    /* функции для теста выхода из профиля н */
    const logOut = () => {
        localStorage.removeItem('access_token_svd')
        router.push('/activate-page')
    }

    const logOutAll = () => {
        localStorage.removeItem('access_token_svd');
        localStorage.removeItem('refresh_token_svd');
        router.push('/activate-page')
    }
    /* функции для теста выхода из профиля к */

    /* для теста рандомного токена н */
    const randomAccess_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    const getRandomToken = () => {
        localStorage.setItem('access_token_svd', randomAccess_token)
    }
    const getRandomRefToken = () => {
        localStorage.setItem('refresh_token_svd', randomAccess_token)
    }

    /* предварительно рабочий вариант */
    const fetchGetProfile = async () => {
        await dispatch(fetchDataUser())
    }
    React.useEffect(() => {
        fetchGetProfile()
        // setTimeout(() => { fetchGetProfile() }, 2000)
    }, [])
    /* предварительно рабочий вариант */

    /* решение от гПт 
     useEffect(() => {
    const storedProfileData = localStorage.getItem('profileData');
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    } else {
      router.push('/login');
    }
  }, [localStorage.getItem('profileData'), router]); */

    /* *** */

    /* решение от Загира 
  
    const fetchGetProfile = async () => {
          await dispatch(fetchDataUser())
      }
      React.useEffect(() => {
        return () => {
   fetchGetProfile()
  }
         }, 2000)
      }, []) */

    return (
        <div className={styles.container}>
            {dataUser.isLoaded === true ?
                <p>Подгружаем данные...</p>
                :
                <>
                    {dataUser.isError !== null ? <h1 style={{ color: "red" }}>Ошибка авторизации, введите ваши данные снова</h1>
                        :
                        <div>
                            <p>Вы успешно зарегистрировались !</p>
                            <p>Имя пользователя: {dataUser.user.username}</p>
                        </div>}
                </>
            }
            {/* блок для тестов аксесс токена н */}
            <div style={{ width: "300px" }}>
                <p style={{ marginTop: '22px' }}>Кнопки сугубо для тестов</p>
                <Button style={{ marginBottom: '25px' }} onClick={logOut}>Выйти из профиля(Удаляем только аксесс токен)</Button>
                <Button style={{ marginBottom: '25px' }} onClick={logOutAll}>Выйти из профиля(Удаляем аксесс и рефреш токен)</Button>
                <Button onClick={getRandomToken}>Подставить рандомный acc токен</Button>
                <Button onClick={getRandomRefToken}>Подставить рандомный rfr токен</Button>

            </div>
            {/* блок для тестов аксесс токена к */}
        </div>
    );
};

