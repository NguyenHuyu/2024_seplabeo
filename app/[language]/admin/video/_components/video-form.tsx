'use client'
import React, { useTransition } from 'react'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { UploadButton } from '@/lib/uploadthing'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import '@uploadthing/react/styles.css'
import Image from 'next/image'
import LoadingButton from '@/components/loading-button'
import { createBanner } from '@/actions/banner'
import { showErrorNotification, showSuccessNotification } from '@/lib/notifications'
import { usePathname, useRouter } from 'next/navigation'
import { usePopup } from '@/providers/use-popup'
import { createVideo } from '@/actions/video.action'

interface Props {
  backFlag?: boolean
}

export const videoSchema = z.object({
  title: z.string({
    required_error: 'Tên không được để trống'
  }),
  videoUrl: z.string({
    required_error: 'Đường dẫn video không được để trống'
  })
})

export default function VideoForm({ backFlag }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathName = usePathname().replace('/create', '')
  const { onToggle } = usePopup()
  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema)
  })
  const { watch } = form

  function onSubmit(values: z.infer<typeof videoSchema>) {
    startTransition(async () => {
      const result = await createVideo(values)
      if (result.status === 201) {
        if (backFlag) {
          router.push(pathName)
        } else {
          onToggle()
        }
        showSuccessNotification(result.message)
      } else {
        showErrorNotification(result.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-3'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>Tên video</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='videoUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>Đường dẫn</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isPending={isPending} staticButton='Tạo mới' />
      </form>
    </Form>
  )
}
