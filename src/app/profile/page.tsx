'use client'
// посмотри как ведет себя юзЛэйаутЭффект и юзЭффект
// придумай, что то с защищенным роутом

import React from 'react'
import styles from './profile.module.scss'
import Button from '@/components/ui/Button/Button'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { fetchDataUser } from '@/store/features/user/user.actions'
import { useAuth } from '@/hooks/useAuth'

export default function Profile() {
	const { logout } = useAuth()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const dataUser = useAppSelector((state) => state.userDateMe)

	// let refresh: string | null = null

	// if (typeof window !== 'undefined') {
	// 	refresh = localStorage.getItem('refresh_token_svd')
	// }

	React.useLayoutEffect(() => {
		dispatch(fetchDataUser())
	}, [dispatch])

	return (
		<div className={styles.container}>
			<div>
				<p>Имя пользователя: {dataUser.user.username}</p>
			</div>
			{/* блок для тестов аксесс токена н */}
			<div style={{ width: '300px' }}>
				<p style={{ marginTop: '22px' }}>Кнопки сугубо для тестов</p>
				<Button style={{ marginBottom: '25px' }} onClick={() => logout()}>
					Выйти из профиля
				</Button>
			</div>
			{/* блок для тестов аксесс токена к */}
		</div>
	)
}
