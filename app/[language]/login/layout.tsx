import React from 'react'
import '../globals.css'
import { IProps } from '@/app/[language]/layout'
import { getSession } from '@/hooks/getSession'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children, params }: IProps) {
  const session = await getSession()

  if (session) {
    redirect(`/${params.language}/admin`)
  }

  return <>{children}</>
}
