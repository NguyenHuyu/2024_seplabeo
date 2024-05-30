'use client'
import React from 'react'
import Image from 'next/image'
import { showErrorNotification, showSuccessNotification } from '@/lib/notifications'
import { News } from '@prisma/client'
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
import { usePathname } from 'next/navigation'
import { deleteNews } from '@/actions/news'

interface Props {
  news: {
    data: News[]
    page?: number
    totalPages?: number
  }
}

export default function NewsTable({ news }: Props) {
  const pathName = usePathname()

  async function handleDelete(id: string) {
    const result = await deleteNews(id)
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
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Mô tả</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {news.data?.length > 0 ? (
            news.data?.map((item) => {
              const route = `${pathName}/${item.id}`
              return (
                <tr key={item.id} className='mx-auto hover:bg-gray-200'>
                  <td className='w-32 md:w-48 p-1'>
                    <div className='w-32 md:w-48 truncate'>{item?.title}</div>
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
                  <td className='text-center'>
                    <div className='w-40 md:w-72 truncate'>{item?.description}</div>
                  </td>
                  <td className='text-center cursor-pointer p-2'>
                    <div className='flex justify-around gap-2'>
                      <Link href={`${route}/read`}>
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
