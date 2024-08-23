import cn from 'clsx'

import styles from './PopupArrow.module.scss'
import { CSSProperties, FC } from 'react'
import React from 'react'

interface IPopupProps {
  position: 'top' | 'bottom' | 'left' | 'right'
  arrowPosition?: 'center' | 'left'
  Content: FC
  Tooltip: FC
  constentStyles?: CSSProperties // для оперативного добавления персональных стилей
  tooltipStyles?: CSSProperties
  iStyles?: CSSProperties
}

const PopupArrow: FC<IPopupProps> = ({
  position,
  arrowPosition,
  Content,
  Tooltip,
  constentStyles,
  tooltipStyles,
}) => {
  const cls = cn(styles.tooltip, {
    [styles.top]: position === 'top',
    [styles.bottom]: position === 'bottom',
    [styles.lLeft]: position === 'left',
    [styles.right]: position === 'right',

    [styles.arrowLeft]: arrowPosition === 'left',
  })

  return (
    <div className={styles.wrapper} style={constentStyles}>
      <Content />

      <div className={cls} style={tooltipStyles}>
        <Tooltip />
      </div>
    </div>
  )
}

export default PopupArrow
