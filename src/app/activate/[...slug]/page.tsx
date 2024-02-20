'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { fetchActivationUserToEmail, fetchActivation } from '@/store/features/user/user.actions'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import styles from "./activate.module.scss"
import Button from '@/components/ui/Button/Button'


export default function VerifyPage() {
    const params = useParams()
    const dispatch = useAppDispatch();
    const { isError, success, isLoaded } = useAppSelector(state => state.userActivation)
    const router = useRouter();
    console.log("ошибка из странички инструкции по активации", isError)

    useEffect(() => {
        const dataFromUrl = {
            uid: '', token: ''
        };
        dataFromUrl.uid = params.slug[0];
        dataFromUrl.token = params.slug[1];
        const dataFromLocalStorage = {
            email: localStorage.getItem("email") || "",
            password: localStorage.getItem("password") || ""
        }
        console.log("данные перед отправкой", dataFromLocalStorage)
        /* код ниже - успешная автоизация */
        const fetchDataFromLocalStorage = async () => {
            try {
                await dispatch(fetchActivationUserToEmail(dataFromUrl)); // пользователь активен
                await dispatch(fetchActivation(dataFromLocalStorage));
            } catch (error) {
                // Обработка ошибок
                console.error("Ошибка при выполнении асинхронных действий:", error);
            }
        }
        /* код ниже - успешная автоизация */
        if (success === false && isError === null) {
            fetchDataFromLocalStorage()
            console.log("success >>>>", success, "isError>>>>", isError)
        } else if (success === true && isError === null) {
            console.log("success === true && isError === null")
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            router.push("/activate-success");
        }
    }, [success, isError, params.slug, dispatch, router])

    return (
        <div className={styles.container}>
            {isLoaded === true ? <p>Получение данны....</p>
                :
                <>
                    {/* @ts-ignore */}
                    {isError?.detail === 'Stale token for given user.' ?
                        <div>
                            <p>Данная ссылка уже была использована для активации, </p>
                            <Button color={"purple"} size={"small"} onClick={() => router.push('/activate-page')}>Войти в систему?</Button>
                        </div>
                        :
                        null}
                </>}


        </div>
    )
}