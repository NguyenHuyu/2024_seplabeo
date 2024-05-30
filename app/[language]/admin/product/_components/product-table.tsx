'use client'
import React from 'react'
import Image from 'next/image'
import { showErrorNotification, showSuccessNotification } from '@/lib/notifications'
import { News, Product } from '@prisma/client'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Link } from 'next-view-transitions'
import { useParams, usePathname } from 'next/navigation'
import { deleteProduct } from '@/actions/product.action'
import { Locale } from '@/i18n.config'

interface Props {
  products: {
    data: Product[]
    page?: number
    totalPages?: number
  }
}

export default function ProductTable({ products }: Props) {
  const pathName = usePathname()
  const params = useParams() as {
    language: Locale
  }

  async function handleDelete(id: string) {
    const result = await deleteProduct(id)
    if (result.status === 200) {
      showSuccessNotification(result?.message)
    } else {
      showErrorNotification(result?.message)
    }
  }

  return (
    <div className='flex w-full md:w-full p-2'>
      <table className='max-w-2xl md:max-w-full w-full overflow-x-scroll'>
        <thead>
          <tr>
            <th>Tên SP</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {products.data?.length > 0 ? (
            products.data?.map((item) => {
              const route = `${pathName}/${item.id}`
              return (
                <tr key={item.id} className='mx-auto hover:bg-gray-200'>
                  <td className='w-32 md:w-48 p-1'>
                    <div className='w-32 md:w-48 truncate'>{item?.name}</div>
                  </td>
                  <td className='text-center w-20 md:w-32'>
                    <Image
                      width={300}
                      height={300}
                      src={item?.imageUrl}
                      alt='banner'
                      className='md:w-32'
                    />
                  </td>
                  <td className='text-center'>{item?.price} VNĐ</td>
                  <td className='text-center cursor-pointer p-2'>
                    <div className='flex justify-around gap-2'>
                      <Link
                        href={`/${params.language}/dong-trung-ha-thao-quang-vy/${item.id}`}
                      >
                        <Eye size={16} color='blue' />
                      </Link>
                      <Link href={`${route}/edit`}>
                        <Pencil size={16} />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash2 size={16} color='red' />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có muốn xóa?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter className='flex justify-center items-center w-full'>
                            <AlertDialogCancel>Không</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>
                              Có
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={4} className='text-center'>
                <p>Không có dữ liệu</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
