"use client"
/* почекать почему не работает прелоадер */

import React from 'react';
import styles from "./profile.module.scss"
import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';



export default function Profile() {
    const router = useRouter()
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





    return (
        <div className={styles.container}>

            <div>
                <p>Имя пользователя: ИМЯ</p>
                <p>Email пользователя:ПОЧТА</p>
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

