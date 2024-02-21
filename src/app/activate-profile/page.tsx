import Button from '@/components/ui/Button/Button'
import styles from './activate.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Activate() {
	const router = useRouter()

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.inner_text}>
					<p>Вы успешно зарегистрировались</p>
					<div>
						На вашу электронную почту отправлено письмо. Для завершения
						регистрации временно, вам необходимо зайти в БД, и поставить флажок
						isActive, как выбранный, после этого, кликните на кнопку ниже для
						завершения регистрации.
					</div>
				</div>
				<div style={{ textAlign: 'center' }}>
					<Button onClick={() => router.push('activate')}>
						Авторизуйтесь!
					</Button>
				</div>
			</div>
		</div>
	)
}

