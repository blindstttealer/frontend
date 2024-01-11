import Link from "next/link";
import styles from "./header.module.scss"

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}><Link href="/">Логотип</Link></div>
            </div>
        </div>
    );
};