import React from 'react'
import WrapperPage from '@/components/wrapper-page'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IProps } from '@/app/[language]/layout'
import NewsForm from '../_components/news-form'

export default function Page({ params }: IProps) {
  const route = `/${params.language}/admin/news`

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Tin tức',
      url: `${route}`
    },
    {
      name: 'Tạo mới',
      url: `${route}/create`,
      bold: true
    }
  ]
  return (
    <WrapperPage title='Tạo mới tin tức' breadCrumbs={breadCrumbs}>
      <NewsForm />
    </WrapperPage>
  )
}
