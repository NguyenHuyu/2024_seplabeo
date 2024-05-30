'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from '@/components/auth/header'
import { BackButton } from '@/components/auth/back-button'
import { useParams } from 'next/navigation'
import { Locale } from '@/i18n.config'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  const params = useParams() as {
    language: Locale
  }

  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={`/${params.language}`} label='Trang chủ' />
      </CardFooter>
    </Card>
  )
}
