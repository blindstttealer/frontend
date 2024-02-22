'use client'

import Link from 'next/link'
import styles from './header.module.scss'
import Input from '../../ui/Input/Input'
import {useForm} from 'react-hook-form'
import Image from 'next/image'

export default function Header() {
    const {register} = useForm()

    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src='/img/logo.png' alt='logo' draggable={false} width={94} height={52}/>
                    </Link>
                </div>
                <div className={styles.inputContainer}>
                    <Image
                        src="/img/search.png"
                        width={24}
                        height={24}
                        alt="search"
                        className={styles.inputImg}
                        draggable={false}
                    />
                    <Input
                        register={register}
                        name="search"
                        placeholder="Искать..."
                        className={styles.input}
                    />
                </div>
                <button className={styles.profile}>
                    <Image src="/img/profile.png" width={30} height={30} alt="profile" draggable={false}/>
                </button>
            </div>
        </div>
    )
}
