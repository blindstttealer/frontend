'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './login.module.scss'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout/layout'
import LoginForm from '@/components/forms/LoginForm'

export default function Login() {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    const oldUrl = window.location.href.split('%22')[1]

    if (isAuth) router.push(oldUrl || '/')
  }, [isAuth, router])

  return (
    <Layout sidebar={false} isSearch={false}>
      <div className={styles.container}>
        <h1>Добро пожаловать в мир су-вид.</h1>
        <LoginForm />
      </div>
    </Layout>
  )
}
