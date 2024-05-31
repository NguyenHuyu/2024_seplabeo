import React from 'react'
import VideoForm from '../_components/video-form'
import WrapperPage from '@/components/wrapper-page'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IProps } from '@/app/[language]/layout'

export default function Page({ params }: IProps) {
  const route = `/${params.language}/admin/video`

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
    <WrapperPage title='Tạo mới video' breadCrumbs={breadCrumbs}>
      <VideoForm backFlag />
    </WrapperPage>
  )
}
