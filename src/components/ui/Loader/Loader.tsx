import Image from "next/image";
import styles from './Loader.module.scss'

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <Image src="/img/loader.svg" alt='loader' width={100} height={100} draggable={false}
                   priority/>
        </div>
    )
}