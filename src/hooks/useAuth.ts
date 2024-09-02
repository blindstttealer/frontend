import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import {
  checkLoginStatus,
  loginUser,
  logoutUser,
} from '@/store/features/user/user.slice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuth = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector((state) => state.userSettings)

  useEffect(() => {
    dispatch(checkLoginStatus({}))
  }, [dispatch])

  const login = (tokens: any) => {
    dispatch(loginUser(tokens))
  }

  const logout = () => {
    dispatch(logoutUser({}))
    router.push('/')
  }

  return { isAuth, login, logout }
}
