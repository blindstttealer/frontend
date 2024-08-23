import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ButtonSocialYandex: FC = () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_YANDEX_AUTH}`

  return (
    <>
      <Link href={url}>
        <Image src="/img/ya.svg" width={38} height={38} alt="yandex" />
      </Link>
    </>
  )
}

export default ButtonSocialYandex
