import styles from './activatePage.module.scss'

export default function Activate() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.inner_text}>
                    <p>Вы успешно зарегистрировались</p>
                    <div>
                        На вашу электронную почту отправлено письмо. Для завершения регистрации временно, вам необходимо зайти в БД, и поставить флажок ис эктив, как выбранный, после этого, кликните на кнопку ниже для завершения регистрации.
                    </div>
                </div>
            </div>
        </div>
    );
}

