'use client'

import Link from 'next/link'
import styles from './header.module.scss'
import Input from '../ui/Input/Input'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

export default function Header() {
	const { register } = useForm()

	return (
		<div className={styles.header}>
			<div className="container">
				<div className={styles.logo}>
					<Link href="/">Логотип</Link>
				</div>
				<div className={styles.inputContainer}>
					<Image
						src="/img/search.png"
						width={24}
						height={24}
						alt="search"
						className={styles.inputImg}
					/>
					<Input
						register={register}
						name="search"
						placeholder="Искать..."
						className={styles.input}
					/>
				</div>
				<button className={styles.profile}>
					<Image src="/img/profile.png" width={30} height={30} alt="profile" />
				</button>
			</div>
		</div>
	)
}
