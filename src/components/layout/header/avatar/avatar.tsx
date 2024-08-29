'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import PopupArrow from '@/components/ui/PopupArrow/PopupArrow'
import { useAuth } from '@/hooks/useAuth'

const Avatar: FC = () => {
  const { isAuth } = useAuth()

  const AuthMenu = <Link href="/logout">Выйти</Link>

  const NoAuthMenu = (
    <ul>
      <li>
        <Link href="/registration">Зарегистрироваться</Link>
      </li>
      <li>
        <Link href="/login">Войти</Link>
      </li>
    </ul>
  )

  return (
    <div>
      <PopupArrow
        position="bottom"
        tooltipStyles={{
          minWidth: '140px',
          textAlign: 'left',
          fontSize: 16,
        }}
        Content={() => (
          <Image
            src="/img/profile.png"
            width={30}
            height={30}
            alt="profile"
            draggable={false}
          />
        )}
        Tooltip={() => (isAuth ? AuthMenu : NoAuthMenu)}
      />
    </div>
  )
}

export default Avatar
