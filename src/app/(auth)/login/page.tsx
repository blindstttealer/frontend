'use client'
import styles from './login.module.scss'
import Layout from '@/components/layout/layout'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'
import LoginForm from '@/components/forms/LoginForm'

export default function Login() {
  return (
    <Layout sidebar={false} isSearch={false}>
      <ButtonBack />
      <div className={styles.container}>
        <p className={styles.paragraph}>Добро пожаловать в мир су-вид.</p>
        <LoginForm />
      </div>
    </Layout>
  )
}
