import { FC } from 'react'
import styles from './Subscriptions.module.scss'

interface SubscriptionsProps {
    username?: string
}

const Subscriptions: FC<SubscriptionsProps> = () => {
  return <div className={styles.container}>Subscriptions</div>
}

export default Subscriptions
