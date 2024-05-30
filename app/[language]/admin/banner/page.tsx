import WrapperPage from '@/components/wrapper-page'
import React from 'react'
import { Locale } from '@/i18n.config'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IListButton } from '@/components/button-pattern'
import { getBanners } from '@/actions/banner'
import BannerTable from './_components/banner-table'

interface PageProps {
  params: {
    language: Locale
  }
}

export default async function AdminPage({ params }: PageProps) {
  const route = `/${params.language}/admin/banner`
  const banners = await getBanners()

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Danh sách Banner',
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
    <WrapperPage title='Quản lý banner' listButton={listButton} breadCrumbs={breadCrumbs}>
      <BannerTable banners={banners} />
    </WrapperPage>
  )
}
