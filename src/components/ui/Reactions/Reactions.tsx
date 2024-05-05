import { FC, useEffect } from 'react'
import Image from 'next/image'
import styles from './Reactions.module.scss'
import { useGetRecipeReactionsQuery } from '@/store/features/reactions/reactions.actions'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { RootState } from '@reduxjs/toolkit/query'
import { useSelector } from 'react-redux'

interface ReactionsProps {
  slug: string
}

const Reactions: FC<ReactionsProps> = ({ slug }) => {
  const { data } = useGetRecipeReactionsQuery(slug)
  const { reactions } = data ?? {}
  const dispatch = useAppDispatch()

  // const count = useAppSelector((state) => state.recipeReactions)
  console.log('count', reactions)

  const onHeartClick = () => {
    console.log('heart')
  }

  const onLikeClick = () => {
    console.log('up')
  }

  const onDislikeClick = () => {
    console.log('down')
  }

  const onFireClick = () => {
    console.log('ev')
  }

  return (
    <div className={styles.reactions}>
      <button>
        <Image
          src="/img/reactions/heart.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onHeartClick}
        />
        {reactions?.Heart ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/thumb-up.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onLikeClick}
        />
        {reactions?.Like ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/thumb-down.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onDislikeClick}
        />
        {reactions?.Dislike ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/evil.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onFireClick}
        />
        {reactions?.Fire ?? 0}
      </button>
    </div>
  )
}

export default Reactions
