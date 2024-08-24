'use client'
import { FC } from 'react'

import styles from './socialForm.module.scss'
import ButtonSocialYandex from './ButtonSocialYandex'
import ButtonSocialVK from './ButtonSocialVK'

const SocialForm: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerLine}>
        <hr />
        <span>или</span>
        <hr />
      </div>
      <div className={styles.innerImg}>
        <ButtonSocialVK />
        <ButtonSocialYandex />
      </div>
    </div>
  )
}

export default SocialForm
