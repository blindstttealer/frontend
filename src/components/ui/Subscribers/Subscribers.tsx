import { FC } from 'react'
import styles from './Subscribers.module.scss'

interface SubscribersProps {
    username?: string
}

const Subscribers: FC<SubscribersProps> = () => {
  return <div className={styles.container}>Subscribers</div>
}

export default Subscribers
