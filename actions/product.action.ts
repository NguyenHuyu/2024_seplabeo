'use server'

import { productSchema } from '@/app/[language]/admin/product/_components/product-form'
import { database } from '@/lib/database'
import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import * as z from 'zod'

export async function createProduct(values: z.infer<typeof productSchema>) {
  const language = cookies().get('language')?.value

  try {
    await database.product.create({
      data: {
        ...values,
        imageUrl: values.imageUrl || '',
        price: Number(values.price)
      }
    })
    revalidatePath(`/${language}/admin/product`)

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

export async function updateProduct(values: z.infer<typeof productSchema>, id: string) {
  const language = cookies().get('language')?.value

  try {
    await database.product.update({
      where: {
        id
      },
      data: {
        ...values,
        price: Number(values.price)
      }
    })
    revalidatePath(`/${language}/admin/product`)

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

export async function getProducts({
  page = 1,
  size = 10
}: {
  page?: number
  size?: number
}) {
  try {
    const pages = page || 1
    const sizes = size || 10

    const skip = Number((pages - 1) * sizes)
    // Get total count of news records
    const totalCount = await database.product.count()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / sizes)

    // Fetch news data with pagination
    const data = await database.product.findMany({
      skip: skip,
      take: sizes
    })
    return {
      data: data as Product[],
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

export async function getProductById(id: string) {
  try {
    const data = await database.product.findUnique({
      where: {
        id
      }
    })
    return data as Product
  } catch (error) {
    return notFound()
  }
}

export async function getProductsRemoveId(id: string) {
  try {
    const data = await database.product.findMany({
      where: {
        AND: [{ id: { not: id } }]
      }
    })

    return data as Product[]
  } catch (error) {
    return notFound()
  }
}

export async function deleteProduct(
  id: string
): Promise<{ status: number; message: string }> {
  const language = cookies().get('language')?.value

  try {
    await database.product.delete({
      where: {
        id
      }
    })
    revalidatePath(`/${language}/admin/product`)

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
