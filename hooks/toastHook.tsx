'use client'

import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

export default function ToastHook({ message }: { message?: string }) {
  const { toast } = useToast()

  function toastFunc() {
    toast({
      title: message
    })
  }

  useEffect(() => {
    toastFunc()
  }, [message])
  return null
}
