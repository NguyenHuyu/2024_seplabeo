import { getNewById } from '@/actions/news'
import WrapperPage from '@/components/wrapper-page'
import React from 'react'
import NewsForm from '../../_components/product-form'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { Locale } from '@/i18n.config'
import { getProductById } from '@/actions/product.action'

export default async function page({
  params
}: {
  params: { id: string; language: Locale }
}) {
  const route = `/${params.language}/admin/product`

  const data = await getProductById(params.id)

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Sản phẩm',
      url: `${route}`
    },
    {
      name: 'Chỉnh sửa',
      url: `${route}/${params.id}/edit`,
      bold: true
    }
  ]

  return (
    <WrapperPage title='Chỉnh sửa tin tức' breadCrumbs={breadCrumbs}>
      <NewsForm data={data} />
    </WrapperPage>
  )
}
