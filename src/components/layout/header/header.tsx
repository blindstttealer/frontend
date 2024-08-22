'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import styles from './header.module.scss'
import Input from '@/components/ui/Input/Input'

export default function Header({ isSearch }: { isSearch: boolean | undefined }) {
    const { register } = useForm()
    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src='/img/logo.png' alt='logo' draggable={false} width={94} height={52} priority={true} />
                    </Link>
                </div>
                {isSearch &&
                    <>
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
                            <Image src="/img/profile.png" width={30} height={30} alt="profile" draggable={false} />
                        </button>
                    </>
                }
            </div>
        </div>
    )
}
