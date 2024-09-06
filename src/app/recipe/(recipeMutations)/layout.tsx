'use client'

import styles from './mutationRecipe.module.scss'
import Layout from '@/components/layout/layout'

export default function RecipeMutationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout isSearch={true} sidebar={false}>
      <div className={styles.container}>{children}</div>
    </Layout>
  )
}
