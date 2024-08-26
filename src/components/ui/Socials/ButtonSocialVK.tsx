import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ButtonSocialVK: FC = () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_VK_AUTH}`

  return (
    <Link href={url}>
      <Image
        style={{ marginRight: '12px' }}
        src="/img/vk.svg"
        width={38}
        height={38}
        alt="vk"
      />
    </Link>
  )
}

export default ButtonSocialVK
