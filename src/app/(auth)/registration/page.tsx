'use client'
import styles from './registration.module.scss'
import Layout from '@/components/layout/layout'
import RegisterForm from '@/components/forms/RegisterForm'

export default function Registration() {
  return (
    <Layout sidebar={false} isSearch={false}>
      <div className={styles.container}>
        <h1>Добро пожаловать в мир су-вид.</h1>
        <RegisterForm />
      </div>
    </Layout>
  )
}
