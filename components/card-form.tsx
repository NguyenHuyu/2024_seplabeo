'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

interface ICardFormProps {
  children?: React.ReactNode
  label?: string
}

export default function CardForm({ children, label }: ICardFormProps) {
  const router = useRouter()

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between px-4'>
        <h1 className='text-lg md:text-xl truncate font-bold'>{label}</h1>
        <Button
          variant='outline'
          className='h-8 w-8 p-2 bg-black text-white hover:bg-black hover:text-white hover:scale-105 duration-200 transition-all'
          onClick={() => router.back()}
        >
          <X size={14} />
        </Button>
      </CardHeader>
      <CardContent className='bg-white p-2'>{children}</CardContent>
    </Card>
  )
}
