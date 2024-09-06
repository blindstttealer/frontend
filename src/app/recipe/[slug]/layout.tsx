import styles from './recipe.module.scss'
import Layout from '@/components/layout/layout'

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout isSearch={true}>
      <div className={styles.container}>{children}</div>
    </Layout>
  )
}
