'use client'
import React, { useState, useTransition } from 'react'
import '@uploadthing/react/styles.css'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { UploadButton } from '@/lib/uploadthing'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import MainTiptap from '@/components/tiptap/main-tiptap'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LoadingButton from '@/components/loading-button'
import { createNews, updateNews } from '@/actions/news'
import { showErrorNotification, showSuccessNotification } from '@/lib/notifications'
import { News } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

export const newsSchemas = z.object({
  title: z.string({
    required_error: 'Tiêu đề là bắt buộc'
  }),
  imageUrl: z.string({
    required_error: 'Hình ảnh là bắt buộc'
  }),
  description: z.optional(z.string()),
  content: z.string({
    required_error: 'Nội dung là bắt buộc'
  })
})

interface NewsFormProps {
  data?: News
}

export default function NewsForm({ data }: NewsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [editorState, setEditorState] = useState<string>(data?.content || '')
  const router = useRouter()
  const pathName = usePathname().replace('/create', '')
  const form = useForm<z.infer<typeof newsSchemas>>({
    resolver: zodResolver(newsSchemas),
    defaultValues: data
  })
  const { watch } = form

  function onSubmit(values: z.infer<typeof newsSchemas>) {
    startTransition(async () => {
      if (data) {
        const result = await updateNews(values, data.id)
        if (result.status === 200) {
          showSuccessNotification(result.message)
        } else {
          showErrorNotification(result.message)
        }
      } else {
        const result = await createNews(values)
        if (result.status === 200) {
          showSuccessNotification(result.message)
          router.push(pathName)
        } else {
          showErrorNotification(result.message)
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-2 p-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
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
                <div className='relative '>
                  {watch('imageUrl') && (
                    <>
                      <Image
                        src={watch('imageUrl')}
                        width={500}
                        height={100}
                        alt='images-slb'
                        className='w-60'
                      />
                      <div className='absolute top-0 left-2'>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => form.setValue('imageUrl', '')}
                        >
                          <X />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <MainTiptap
                  isEdit={true}
                  setFormvalues={form.setValue}
                  setEditorState={setEditorState}
                  editorState={editorState}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          {data ? (
            <LoadingButton isPending={isPending} staticButton='Cập nhật' />
          ) : (
            <LoadingButton isPending={isPending} staticButton='Tạo mới' />
          )}
        </div>
      </form>
    </Form>
  )
}
