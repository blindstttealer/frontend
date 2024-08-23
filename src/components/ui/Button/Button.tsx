import Image from 'next/image'
import cn from 'clsx'

import styles from './Button.module.scss'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  color?: 'purple' | 'white' | 'gray' | 'primary' | 'secondary'
  size?: 'big' | 'medium' | 'small'
  disabled?: boolean
  loading?: boolean
}

const Button: FC<IButton> = ({
  children,
  className,
  color,
  size,
  disabled,
  loading,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.disabled]: disabled === true,
        // новое
        [styles.primary]: color === 'primary',
        [styles.secondary]: color === 'secondary',
        // было
        [styles.big]: size === 'big',
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
      })}
      disabled={disabled || !!loading}
      {...props}
    >
      {loading ? (
        <Image
          src="/img/loader.svg"
          alt="loader"
          width={30}
          height={30}
          draggable={false}
          priority
        />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
