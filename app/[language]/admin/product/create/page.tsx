import React from 'react'
import WrapperPage from '@/components/wrapper-page'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IProps } from '@/app/[language]/layout'
import ProductForm from '../_components/product-form'

export default function Page({ params }: IProps) {
  const route = `/${params.language}/admin/news`

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Sản phẩm',
      url: `${route}`
    },
    {
      name: 'Tạo mới sản phẩm',
      url: `${route}/create`,
      bold: true
    }
  ]
  return (
    <WrapperPage title='Tạo mới sản phẩm' breadCrumbs={breadCrumbs}>
      <ProductForm />
    </WrapperPage>
  )
}
