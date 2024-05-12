'use client'

import Layout from '@/components/layout/layout'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout isSearch={true} rightbar={false}>
      {children}
    </Layout>
  )
}
