'use client'
import { showErrorNotification, showSuccessNotification } from '@/lib/notifications'
import { Video } from '@prisma/client'
import { Trash2 } from 'lucide-react'
import React from 'react'
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
import { deleteVideo } from '@/actions/video.action'

interface Props {
  videos: Video[]
}

export default function VideoTable({ videos }: Props) {
  async function handleDelete(id: string) {
    const result = await deleteVideo(id)
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
            <th>Tên video</th>
            <th>Đường dẫn</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {videos?.length > 0 ? (
            videos?.map((item) => {
              return (
                <tr key={item.id} className='mx-auto hover:bg-gray-200'>
                  <td className='text-center'>{item?.title}</td>
                  <td className='w-52 md:w-96'>
                    <div className='text-center w-52 md:w-96 overflow-x-scroll'>
                      {item?.videoUrl}
                    </div>
                  </td>
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
