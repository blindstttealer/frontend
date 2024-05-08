'use client'

import { FC } from 'react'
import Image from 'next/image'
import { UserData } from '@/store/features/user/user.types'

type Props = {
  data?: UserData
}

const ProfileAvatar: FC<Props> = ({ data }) => {
  return (
    <Image
      src={data?.avatar ?? '/img/user-big.svg'}
      priority={true}
      width={120}
      height={120}
      alt="user image"
    />
  )
}

export default ProfileAvatar
