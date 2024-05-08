'use client'

import { FC, useState } from 'react'
import styles from './Tabs.module.scss'
import Tab from './Tab/Tab.module'

export type TabData = {
  label: string
  Content?: JSX.Element
}

export type TabProps = {
  tabs: TabData[]
  defaultTab?: number
}

const Tabs: FC<TabProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? 0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => handleTabClick(index)}
            isActive={index === activeTab}
          />
        ))}
      </div>
      <div className={styles.content}>{tabs[activeTab]?.Content}</div>
    </div>
  )
}

export default Tabs
