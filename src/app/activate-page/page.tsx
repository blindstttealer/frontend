'use client'
import styles from './activate.module.scss'
import Layout from '@/components/layout/layout'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'
import LoginForm from '@/components/forms/LoginForm'

export default function Authentication() {
  return (
    <Layout sidebar={false} isSearch={false}>
      <ButtonBack />
      <div className={styles.container}>
        <p className={styles.paragraph}>С возвращением в мир су-вид!</p>
        <LoginForm />
      </div>
    </Layout>
  )
}
