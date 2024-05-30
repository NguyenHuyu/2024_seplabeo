'use server'

import { newsSchemas } from '@/app/[language]/admin/news/_components/news-form'
import { database } from '@/lib/database'
import { News } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import * as z from 'zod'

export async function createNews(values: z.infer<typeof newsSchemas>) {
  const language = cookies().get('language')?.value

  try {
    await database.news.create({
      data: {
        title: values.title,
        imageUrl: values.imageUrl,
        description: values.description || '',
        content: values.content
      }
    })
    revalidatePath(`/${language}/admin/news`)

    return {
      status: 200,
      message: 'Tạo thành công'
    }
  } catch (error) {
    return {
      status: 400,
      message: 'Tạo thất bại'
    }
  }
}

export async function updateNews(values: z.infer<typeof newsSchemas>, id: string) {
  const language = cookies().get('language')?.value

  try {
    await database.news.update({
      where: {
        id
      },
      data: {
        ...values,
        title: values.title,
        imageUrl: values.imageUrl,
        description: values.description || '',
        content: values.content
      }
    })
    revalidatePath(`/${language}/admin/news`)

    return {
      status: 200,
      message: 'Cập nhật thành công'
    }
  } catch (error) {
    return {
      status: 400,
      message: 'Cập nhật thất bại'
    }
  }
}

export async function getNews({ page = 1, size = 10 }: { page?: number; size?: number }) {
  try {
    const pages = page || 1
    const sizes = size || 10

    const skip = Number((pages - 1) * sizes)
    // Get total count of news records
    const totalCount = await database.news.count()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / sizes)

    // Fetch news data with pagination
    const data = await database.news.findMany({
      skip: skip,
      take: sizes
    })
    return {
      data: data as News[],
      page: pages,
      totalPages: totalPages
    }
  } catch (error) {
    return {
      data: [],
      total: 0,
      page: 0,
      size: 0
    }
  }
}

export async function getNewById(id: string) {
  try {
    const data = await database.news.findUnique({
      where: {
        id
      }
    })
    return data as News
  } catch (error) {
    return notFound()
  }
}

export async function deleteNews(
  id: string
): Promise<{ status: number; message: string }> {
  const language = cookies().get('language')?.value

  try {
    await database.news.delete({
      where: {
        id
      }
    })
    revalidatePath(`/${language}/admin/news`)

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
