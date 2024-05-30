import { getNewById } from '@/actions/news'
import WrapperPage from '@/components/wrapper-page'
import React from 'react'
import NewsForm from '../../_components/news-form'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { Locale } from '@/i18n.config'

export default async function page({
  params
}: {
  params: { id: string; language: Locale }
}) {
  const route = `/${params.language}/admin/news`

  const data = await getNewById(params.id)

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Tin tức',
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
