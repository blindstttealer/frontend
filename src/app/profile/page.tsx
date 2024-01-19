"use client"
/* почекать почему не работает прелоадер */

import React from 'react';
import styles from "./profile.module.scss"
import { axiosInstance } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getDataProfileStart, getDataProfileSuccess, getDataProfileFailure } from '../../redux/features/user/getUserProfile'
import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';



export default function Profile() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { profile, isLoading, isError } = useAppSelector(state => state.dataUser)
    /* функции для теста выхода из профиля н */
    const logOut = () => {
        localStorage.removeItem('access_token')
        router.push('/activate')
    }

    const logOutAll = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/activate')
    }
    /* функции для теста выхода из профиля к */

    /* для теста рандомного токена н */
    const randomAccess_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    const getRandomToken = () => {
        localStorage.setItem('access_token', randomAccess_token)
    }
    /* для теста рандомного токена к */
    if (isError) {
        router.push('/activate')
    }
    const fetchCheckAuth = async () => {
        try {
            dispatch(getDataProfileStart())
            await axiosInstance({
                url: "users/me",
                method: "GET",
            }).then((res) => dispatch(getDataProfileSuccess(res.data)))

        } catch (e) {
            dispatch(getDataProfileFailure(e))
        }
    };

    React.useEffect(() => {
        fetchCheckAuth()
    }, [])

    return (
        <div className={styles.container}>
            {isLoading &&
                <p>Получаем данные пользователя...</p>
            }
            <div>
                <p>Имя пользователя:{profile.username}</p>
                <p>Email пользователя:{profile.email}</p>
            </div>
            {/* блок для тестов аксесс токена н */}
            <div style={{ width: "300px" }}>
                <p style={{ marginTop: '22px' }}>Кнопки сугубо для тестов</p>
                <Button style={{ marginBottom: '25px' }} onClick={logOut}>Выйти из профиля(Удаляем только аксесс токен)</Button>
                <Button style={{ marginBottom: '25px' }} onClick={logOutAll}>Выйти из профиля(Удаляем аксесс и рефреш токен)</Button>
                <Button onClick={getRandomToken}>Подставить рандомный токен</Button>
            </div>
            {/* блок для тестов аксесс токена к */}
        </div>

    );
};

