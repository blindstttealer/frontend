'use client'
import { useAuth } from '@/hooks/useAuth'
import styles from './sidebar.module.scss'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import cn from 'clsx'
import NavLink from '@/components/ui/NavLink/NavLink'

type MenuItem = {
  text: string
  img: string
  alt: string
  path: string
}

const menu: MenuItem[] = [
  {
    text: 'Домой',
    img: '/img/sidebar/home.svg',
    alt: 'home',
    path: '/',
  },
  {
    text: 'Уведомления',
    img: '/img/sidebar/notifications.svg',
    alt: 'notifications',
    path: '/notifications',
  },
  {
    text: 'Закладки',
    img: '/img/sidebar/favorites.svg',
    alt: 'favorites',
    path: '/favorites',
  },
  {
    text: 'Профиль',
    img: '/img/sidebar/user.svg',
    alt: 'profile',
    path: '/profile',
  },
  {
    text: 'Настройки',
    img: '/img/sidebar/settings.svg',
    alt: 'setting',
    path: '/setting',
  },
]

export default function Sidebar() {
  const { isAuth } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const jsxIsAuth = (
    <div className={styles.auth}>
      {menu.map(({ text, img, alt, path }, key) => (
        <NavLink
          key={key}
          text={text}
          img={img}
          alt={alt}
          url={path}
          active={pathname === path}
        />
      ))}
    </div>
  )

  const jsxIsNotAuth = (
    <div className={styles.notAuth}>
      <button
        className={styles.button}
        onClick={() => router.push('activate-page')}
      >
        Войти
      </button>
      <button
        className={styles.button}
        onClick={() => router.push('registration')}
      >
        Регистрация
      </button>
    </div>
  )

  return (
    <div className={styles.sidebar}>
      {isAuth ? jsxIsAuth : jsxIsNotAuth}

      <div className={styles.more}>
        <p>FAQ</p>
        <p>Правила сайта</p>
        <p>Еще</p>
      </div>

      <div className={styles.mobileApp}>
        <Image
          src="/img/sidebar/mobileapp.png"
          alt="mobile app"
          width={28}
          height={28}
          draggable={false}
        />
        <p>Скачайте мобильное приложение </p>
      </div>
    </div>
  )
}
