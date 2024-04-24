"use client"

import { useEffect } from 'react'
import styles from './profile.module.scss'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { fetchDataUser, fetchDataUserName } from '@/store/features/user/user.actions'
import { useAuth } from '@/hooks/useAuth'
import Layout from "@/components/layout/layout";
import { Loader } from '@/components/ui/Loader/Loader'

export default function Profile() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const dataUser = useAppSelector(state => state.userDateMe);
    // ниже данные с которыми необходимо работать
    const userNameDataFromAll = useAppSelector(state => state.userName)
    console.log("userNameDataFromAll", userNameDataFromAll);

    // @ts-ignore
    // эту функцию надо тестить это ридерект, если токен протух на страницу авторизации
    dataUser?.isError?.code && dataUser.isError.code === "token_not_valid" ? router.push('/activate-page') : null

    /* предварительно рабочий вариант */

    useEffect(() => {
        dispatch(fetchDataUser());
        if (dataUser.success) {
            dispatch(fetchDataUserName(dataUser.user.username))
        }
    }, [dataUser.user.username])
    /* предварительно рабочий вариант */
    return (
        <Layout isSearch={true} rightbar={false}>
            <>
                {userNameDataFromAll.isLoaded === true ?
                    <Loader />
                    :
                    <>
                        {dataUser.isError !== null ?
                            <h1 style={{ color: "red" }}>Ошибка авторизации, введите ваши данные снова</h1>
                            :
                            <div >
                                <p>Вы успешно зарегистрировались !</p>
                                <p>Имя пользователя: {userNameDataFromAll.user.username}</p>
                            </div>}
                    </>
                }
            </>
        </Layout>
    );
};

