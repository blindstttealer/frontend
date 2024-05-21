import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  IInitialState,
  setSlice,
} from './recipes/recipes.slice'

const UserSettingsInitializer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userSettings = localStorage.getItem('userSettings')

      if (userSettings) {
        const settings = JSON.parse(userSettings) as IInitialState
        dispatch(setSlice(settings))
      }
    }
  }, [dispatch])

  return <>{children}</>
}

export default UserSettingsInitializer
