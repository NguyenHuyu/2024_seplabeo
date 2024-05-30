'use server'

import { bannerSchema } from '@/app/[language]/admin/banner/_components/banner-form'
import { database } from '@/lib/database'
import { Banner } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import * as z from 'zod'

export async function getBanners() {
  try {
    const data = await database.banner.findMany()
    return data as Banner[]
  } catch (error) {
    return []
  }
}

export async function createBanner(
  values: z.infer<typeof bannerSchema>
): Promise<{ status: number; message: string }> {
  const language = cookies().get('language')?.value

  const { title, imageUrl } = values
  try {
    await database.banner.create({
      data: {
        title,
        imageUrl: [imageUrl],
        description: 'Test'
      }
    })
    revalidatePath(`/${language}/admin/banner`)

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

export async function deleteBanner(
  id: string
): Promise<{ status: number; message: string }> {
  const language = cookies().get('language')?.value

  try {
    await database.banner.delete({
      where: {
        id
      }
    })
    revalidatePath(`/${language}/admin/banner`)

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
