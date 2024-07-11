'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('access_token_svd')
    localStorage.removeItem('refresh_token_svd')
    router.push('/')
  }, [router])
}
