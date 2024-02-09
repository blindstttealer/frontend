'use client'

import Button from '@/components/ui/Button/Button'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<div>
			<div className="container">
				<p className={styles.paragraph}>Добро пожаловать в мир су-вид!</p>
				<div className={styles.innerButton}>
					<Button color="purple" onClick={() => router.push('/registration')}>
						Зарегистрироваться
					</Button>
					<span className={styles.bottomButton}>
						<Button onClick={() => router.push('/main')}>
							Войти без регистрации
						</Button>
					</span>
				</div>
			</div>
		</div>
	)
}
