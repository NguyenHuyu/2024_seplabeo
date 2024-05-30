'use client'
import { deleteBanner } from '@/actions/banner'
import { showErrorNotification, showSuccessNotification } from '@/lib/notifications'
import { Banner } from '@prisma/client'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface Props {
  banners: Banner[]
}

export default function TableBanner({ banners }: Props) {
  async function handleDelete(id: string) {
    const result = await deleteBanner(id)
    if (result.status === 200) {
      showSuccessNotification(result.message)
    } else {
      showErrorNotification(result.message)
    }
  }

  return (
    <div className='flex w-full md:w-full p-2'>
      <table className='max-w-2xl md:max-w-full w-full overflow-x-scroll'>
        <thead>
          <tr>
            <th>Tên banner</th>
            <th>Hình ảnh</th>
            <th>Ngày tạo</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {banners?.length > 0 ? (
            banners?.map((item) => {
              return (
                <tr key={item.id} className='mx-auto hover:bg-gray-200'>
                  <td className='text-center'>{item?.title}</td>
                  <td className='text-center w-20 md:w-40 '>
                    <Image
                      width={100}
                      height={100}
                      src={item?.imageUrl[0]}
                      alt='banner'
                      className='w-40 '
                    />
                  </td>
                  <td className='text-center truncate w-40'>{String(item?.createdAt)}</td>
                  <td className='text-center cursor-pointer'>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash2 size={16} color='red' />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Bạn có muốn xóa?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Không</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)}>
                            Có
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
