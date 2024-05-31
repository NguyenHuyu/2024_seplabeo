'use server'
import { bannerSchema } from '@/app/[language]/admin/banner/_components/banner-form'
import { videoSchema } from '@/app/[language]/admin/video/_components/video-form'
import { database } from '@/lib/database'
import { Banner, Video } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import * as z from 'zod'

export async function getVideos() {
  try {
    const data = await database.video.findMany()
    return data as Video[]
  } catch (error) {
    return []
  }
}

export async function createVideo(
  values: z.infer<typeof videoSchema>
): Promise<{ status: number; message: string }> {
  const language = cookies().get('language')?.value

  const { title, videoUrl } = values
  try {
    await database.video.create({
      data: {
        title,
        videoUrl
      }
    })
    revalidatePath(`/${language}/admin/video`)

    return {
      status: 201,
      message: 'Tạo thành công'
    }
  } catch (error) {
    return {
      status: 400,
      message: 'Tạo thất bại'
    }
  }
}

export async function deleteVideo(
  id: string
): Promise<{ status: number; message: string }> {
  const language = cookies().get('language')?.value

  try {
    await database.video.delete({
      where: {
        id
      }
    })
    revalidatePath(`/${language}/admin/video`)

    return {
      status: 200,
      message: 'Xóa thành công'
    }
  } catch (error) {
    return {
      status: 400,
      message: 'Xóa thất bại'
    }
  }
}
