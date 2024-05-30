import React from 'react'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IListButton } from '@/components/button-pattern'
import WrapperPage from '@/components/wrapper-page'
import { IProps } from '@/app/[language]/layout'
import NewsTable from './_components/product-table'
import { getProducts } from '@/actions/product.action'

export default async function AdminPage({ params, searchParams }: IProps) {
  const route = `/${params.language}/admin/product`

  const products = await getProducts({
    page: Number(searchParams.page),
    size: Number(searchParams.size)
  })

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Sản phẩm',
      url: `${route}`,
      bold: true
    }
  ]

  const listButton: IListButton[] = [
    {
      name: 'Tạo mới sản phẩm',
      url: `${route}/create`,
      file: false
    }
  ]

  return (
    <WrapperPage
      title='Quản lý sản phẩm'
      listButton={listButton}
      breadCrumbs={breadCrumbs}
      dataList={products}
    >
      <NewsTable products={products} />
    </WrapperPage>
  )
}
