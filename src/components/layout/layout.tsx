'use client'
import { FC, ReactNode } from 'react'
import Header from '@/components/layout/header/header'
import Sidebar from '@/components/layout/sidebar/sidebar'
import styles from './layout.module.scss'

type Props = {
  children: ReactNode
  sidebar?: boolean
  isSearch?: boolean | undefined
}

const Layout: FC<Props> = ({ children, sidebar = true, isSearch }) => (
  <div className={styles.layout}>
    <div className="container" style={{ flexDirection: 'column' }}>
      <Header isSearch={isSearch} />
      <div className={styles.layoutTwo}>
        {sidebar && <Sidebar />}
        {children}
      </div>
    </div>
  </div>
)

export default Layout
