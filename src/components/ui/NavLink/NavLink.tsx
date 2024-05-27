'use client'

import { FC } from 'react'
import styles from './NavLink.module.scss'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  text: string
  url: string
  img: string
  alt: string
  active?: boolean
  width?: number
  height?: number
}

const NavLink: FC<Props> = ({
  text,
  url,
  img,
  alt,
  active,
  width = 22,
  height = 22,
}) => {
  return (
    <>
      <Link
        className={cn(styles.link, {
          [styles.active]: active === true,
        })}
        href={url}
      >
        <p>{text}</p>
        <Image src={img} alt={alt} width={width} height={height} />
      </Link>
    </>
  )
}

export default NavLink
