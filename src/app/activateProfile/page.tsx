import Button from '@/components/ui/Button/Button';
import styles from './activatePage.module.scss'
import Link from 'next/link';

export default function Activate() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.inner_text}>
                    <p>Вы успешно зарегистрировались</p>
                    <div>
                        На вашу электронную почту отправлено письмо. Для завершения регистрации временно, вам необходимо зайти в БД, и поставить флажок isActive, как выбранный, после этого, кликните на кнопку ниже для завершения регистрации.
                    </div>
                </div>
                <div style={{ textAlign: "center" }}><Link href='/activate'><Button>Авторизуйтесь!</Button></Link></div>
            </div>
        </div>
    );
}

