'use client'
import {useAuth} from "@/hooks/useAuth";
import styles from './sidebar.module.scss'
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Sidebar() {
    const {isAuth} = useAuth()
    const router = useRouter()
    return (

        <div className={styles.sidebar}>
            {isAuth ? (
                <div className={styles.auth}>
                    <button className={styles.buttons}>
                        <p>Домой</p>
                        <Image src="/img/home.png" alt="home" width={22} height={22}/>
                    </button>
                    <hr/>
                </div>
            ) : (
                <div className={styles.notAuth}>
                    <button className={styles.button} onClick={() => router.push('activate')}>
                        Войти
                    </button>
                    <button className={styles.button} onClick={() => router.push('registration')}>
                        Регистрация
                    </button>
                    <hr style={{border: "1px solid #B7B7B7"}}/>
                    <div className={styles.mobileApp}>
                        <Image src='/img/mobileapp.png' alt='mobile app' width={28} height={28} draggable={false}/>
                        <p>Скачайте мобильное приложение </p>
                    </div>
                </div>
            )}
        </div>
    )
};
