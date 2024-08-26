'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import PopupArrow from '@/components/ui/PopupArrow/PopupArrow'

const Avatar: FC = () => {
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
        Tooltip={() => <Link href="/logout">Выйти</Link>}
      />
    </div>
  )
}

export default Avatar
