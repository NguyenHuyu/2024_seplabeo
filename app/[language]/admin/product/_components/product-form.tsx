'use client'
import React, { useEffect, useState, useTransition } from 'react'
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
import { News, Product } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/actions/product.action'

export const productSchema = z.object({
  name: z.string({
    required_error: 'Têm sản phẩm là bắt buộc'
  }),
  content: z.optional(z.string(), z.null()),
  imageUrl: z.optional(
    z.string({
      required_error: 'Hình ảnh là bắt buộc'
    })
  ),
  picture: z.array(z.string()),
  price: z.any()
})

interface ProductFormProps {
  data?: Product
}

export default function ProductForm({ data }: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [editorState, setEditorState] = useState<string>(data?.content || '')
  const router = useRouter()
  const pathName = usePathname().replace('/create', '')

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: data
  })

  const { watch, setValue } = form

  function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(async () => {
      if (!data) {
        const result = await createProduct(values)
        if (result.status === 200) {
          showSuccessNotification(result.message)
          router.push(pathName)
        } else {
          showErrorNotification(result.message)
        }
      } else {
        const result = await updateProduct(values, data.id)
        if (result.status === 200) {
          showSuccessNotification(result.message)
          router.push(pathName)
        } else {
          showErrorNotification(result.message)
        }
      }
    })
  }

  const [formData, setFormData] = useState<{
    productions: string[]
  }>({
    productions: []
  })

  const handleRemoveProduction = (index: number) => {
    const newProductions = [...formData.productions]
    newProductions.splice(index, 1)
    setFormData({
      ...formData,
      productions: newProductions
    })
  }

  const handleAddProduction = () => {
    setFormData({
      ...formData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      productions: [...formData?.productions, '']
    })
  }

  const handleRemoveImage = (index: any) => {
    const newProductions = [...formData.productions]
    newProductions[index] = ''
    setFormData({
      ...formData,
      productions: newProductions
    })
  }

  useEffect(() => {
    if (data) {
      setFormData({
        productions: data?.picture || []
      })
    }
  }, [data])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-2 p-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá</FormLabel>
                <FormControl>
                  <Input {...field} className='md:w-2/3' type='number' />
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
                <div className='relative'>
                  {watch('imageUrl') && (
                    <>
                      <Image
                        src={watch('imageUrl') || ''}
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
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Ảnh phụ{' '}
                  <span className='text-red-500 font-normal text-sm'>
                    (Vui lòng đợi upload ảnh cũ xong thì thêm mới)
                  </span>
                </FormLabel>
                <div className='mb-2 px-20 space-y-4 '>
                  {formData?.productions?.map((production: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className='flex justify-between border border-green-900 py-4 text-sm font-medium text-gray-900  rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 px-4'
                      >
                        <div className='basis-5/6'>
                          <label>
                            Ảnh {index + 1}
                            <UploadButton
                              endpoint='imageUploader'
                              onClientUploadComplete={(res) => {
                                if (res) {
                                  const newProductions = [...formData.productions]
                                  newProductions[index] = res[0].url
                                  setFormData({
                                    ...formData,
                                    productions: newProductions
                                  })
                                  setValue('picture', newProductions)
                                }
                              }}
                              onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`)
                              }}
                            />
                          </label>
                          {production && (
                            <Image
                              src={`${production}`}
                              alt={`Production ${index + 1}`}
                              width={500}
                              height={100}
                              className='w-60'
                            />
                          )}
                          {production && (
                            <button
                              className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg'
                              onClick={() => handleRemoveImage(index)}
                            >
                              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                                X
                              </span>
                            </button>
                          )}
                        </div>
                        <button
                          className='group  relative inline-flex items-center justify-center overflow-hidden rounded-lg'
                          onClick={() => handleRemoveProduction(index)}
                        >
                          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                            Xóa
                          </span>
                        </button>
                      </div>
                    )
                  })}
                  <Button type='button' onClick={handleAddProduction}>
                    Thêm ảnh
                  </Button>
                </div>
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
        </div>

        {data ? (
          <LoadingButton isPending={isPending} staticButton='Cập nhật' />
        ) : (
          <LoadingButton isPending={isPending} staticButton='Tạo mới' />
        )}
      </form>
    </Form>
  )
}
