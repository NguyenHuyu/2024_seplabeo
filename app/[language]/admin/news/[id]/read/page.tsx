import React from 'react'
import { getNewById } from '@/actions/news'
import WrapperPage from '@/components/wrapper-page'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import { Locale } from '@/i18n.config'
import RenderTiptap from '@/components/tiptap/render-tiptap'
import Image from 'next/image'

export default async function page({
  params
}: {
  params: {
    id: string
    language: Locale
  }
}) {
  const route = `/${params.language}/admin/news`

  const data = await getNewById(params.id)

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Tin tức',
      url: `${route}`
    },
    {
      name: 'Xem chi tiết',
      url: `${route}/${params.id}/read`,
      bold: true
    }
  ]

  return (
    <WrapperPage title='Xem chi tiết tin tức' breadCrumbs={breadCrumbs}>
      <main className='mx-auto w-full max-w-4xl'>
        <div className='mb-4 md:mb-0 w-full relative'>
          <div className='px-4 lg:px-0'>
            <h2 className='title-font text-xl font-semibold text-black mb-3  text-justify text-wrap'>
              {data?.title}
            </h2>
          </div>
        </div>
        <div className='mb-4 md:mb-0 w-full relative'>
          <div className='px-4 lg:px-0'>
            <h2 className='title-font text-lg font-normal text-black mb-3  text-justify text-wrap'>
              {data?.description}
            </h2>
          </div>
        </div>
        <div className=' mx-auto md:border md:rounded '>
          <Image
            src={data?.imageUrl}
            width={1000}
            height={1000}
            alt={data?.title}
            className='w-full object-contain'
          />
        </div>
        <div className='flex flex-col lg:flex-row lg:space-x-12'>
          <div className='px-4 lg:px-0 text-gray-700 text-lg leading-relaxed w-full'>
            <RenderTiptap news={data} />
          </div>
        </div>
      </main>
    </WrapperPage>
  )
}
