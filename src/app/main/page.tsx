import styles from "./main.module.scss"

export default function Header() {
    return (
        <div>
            <div className={styles.container}>
                <p className={styles.paragraph}>Контент доступный без регистрации</p>
            </div>
        </div>
    );
};