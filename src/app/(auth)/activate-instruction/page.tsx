"use client"

import styles from './activate-instruction.module.scss'
import { useAppSelector } from '@/store/features/hooks';

// let refresh: string | null = null;

// if (typeof window !== "undefined") {
//     refresh = localStorage.getItem("refresh_token_svd")
// }

export default function Activate() {
    const { profileFromActivation } = useAppSelector(state => state.userRegistration)

    if (typeof window !== "undefined") {
        localStorage.setItem("email", profileFromActivation.email);
        localStorage.setItem("password", profileFromActivation.password)
    }
    // console.log("профиль для активации из страницы инструкции данные", profileFromActivation)
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.inner_text}>
                    <p>Для завершения регистрации, следуйте инструкции.</p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <div>
                        На вашу электронную почту отправлено письмо. Для завершения регистрации временно, вам необходимо из ссылки что пришла вам на эл. ящик скопировать {`хвост`}, пример: {`/activate/MTc0/c24pr4-e755779ab2abcee61bfac723db94f2dc`}, и подставить в поле ввода URL после {`http://localhost:3000`}.
                    </div>
                </div>
            </div>
        </div>
    );
}
