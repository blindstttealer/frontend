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
    const logOut = () => {
        localStorage.removeItem('token')
        router.push('/activate')
    }
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
            <p style={{ marginTop: '22px' }}>Кнопка сугубо для тестов</p>
            <Button onClick={logOut}>Выйти из профиля</Button>
        </div>
    );
};

