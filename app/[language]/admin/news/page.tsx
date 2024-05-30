import React from 'react'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { IListButton } from '@/components/button-pattern'
import WrapperPage from '@/components/wrapper-page'
import { IProps } from '@/app/[language]/layout'
import NewsTable from './_components/news-table'
import { getNews } from '@/actions/news'

export default async function AdminPage({ params, searchParams }: IProps) {
  const route = `/${params.language}/admin/news`

  const news = await getNews({
    page: Number(searchParams.page),
    size: Number(searchParams.size)
  })

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Tin tức',
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
    <WrapperPage
      title='Quản lý tin tức'
      listButton={listButton}
      breadCrumbs={breadCrumbs}
      dataList={news}
    >
      <NewsTable news={news} />
    </WrapperPage>
  )
}
