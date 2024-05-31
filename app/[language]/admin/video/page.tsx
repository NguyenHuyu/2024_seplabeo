import WrapperPage from '@/components/wrapper-page'
import React from 'react'
import { Locale } from '@/i18n.config'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IListButton } from '@/components/button-pattern'
import { getBanners } from '@/actions/banner'
import VideoTable from './_components/video-table'
import { getVideos } from '@/actions/video.action'

interface PageProps {
  params: {
    language: Locale
  }
}

export default async function AdminPage({ params }: PageProps) {
  const route = `/${params.language}/admin/video`
  const videos = await getVideos()

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Danh sách Video',
      url: `${route}`,
      bold: true
    }
  ]

  const listButton: IListButton[] = [
    {
      name: 'Tạo mới',
      url: `${route}/create`,
      file: false
    }
  ]

  return (
    <WrapperPage title='Quản lý video' listButton={listButton} breadCrumbs={breadCrumbs}>
      <VideoTable videos={videos} />
    </WrapperPage>
  )
}
