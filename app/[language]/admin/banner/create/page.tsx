import React from 'react'
import BannerForm from '../_components/banner-form'
import WrapperPage from '@/components/wrapper-page'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IProps } from '@/app/[language]/layout'

export default function Page({ params }: IProps) {
  const route = `/${params.language}/admin/banner`

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Danh sách Banner',
      url: `${route}`
    },
    {
      name: 'Tạo mới',
      url: `${route}/create`,
      bold: true
    }
  ]
  return (
    <WrapperPage title='Tạo mới banner' breadCrumbs={breadCrumbs}>
      <BannerForm backFlag />
    </WrapperPage>
  )
}
