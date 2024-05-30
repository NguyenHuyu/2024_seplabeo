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

interface Props {
  backFlag?: boolean
}

export const bannerSchema = z.object({
  title: z.string({
    required_error: 'Tên không được để trống'
  }),
  imageUrl: z.string({
    required_error: 'Ảnh không được để trống'
  })
})

export default function BannerForm({ backFlag }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathName = usePathname().replace('/create', '')
  const { onToggle } = usePopup()
  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema)
  })
  const { watch } = form

  function onSubmit(values: z.infer<typeof bannerSchema>) {
    startTransition(async () => {
      const result = await createBanner(values)
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
              <FormLabel className='text-lg'>Tên ảnh</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem className='flex justify-between'>
              <FormLabel className='text-lg'>Ảnh</FormLabel>
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  if (res) {
                    form.setValue('imageUrl', res[0]?.url)
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`)
                }}
              />
              {watch('imageUrl') && (
                <Image
                  src={watch('imageUrl')}
                  width={500}
                  height={100}
                  alt='images-slb'
                  className='w-60'
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isPending={isPending} staticButton='Tạo mới' />
      </form>
    </Form>
  )
}
