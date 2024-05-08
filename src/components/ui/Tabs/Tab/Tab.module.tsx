import React, { FC } from 'react'
import styles from './Tab.module.scss'

type TapProps = {
  label: string
  onClick: () => void
  isActive: boolean
}

const Tab: FC<TapProps> = ({ label, onClick, isActive }) => {
  const tabClass = [styles.tab]
  if (isActive) tabClass.push(styles.active)

  return (
    <div className={tabClass.join(' ')} onClick={onClick}>
      {label}
    </div>
  )
}
export default Tab
