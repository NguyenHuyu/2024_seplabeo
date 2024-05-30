import React from 'react'
import { IProps } from '../../../layout'
import { Metadata } from 'next'
import { getNewById } from '@/actions/news'
import { optimizeSlugify } from '@/lib/slug'
import { getUrlParams } from '@/lib/getUrlParams'
import WrapperPage from '@/components/wrapper-page'
import { IBreadcrumb } from '@/components/Breadcrumbs'
import Image from 'next/image'
import RenderTiptap from '@/components/tiptap/render-tiptap'

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const news = await getNewById(getUrlParams(params.id))
  return {
    title: news?.title,
    description: news?.description,
    openGraph: {
      title: news?.title,
      description: news?.title,
      type: 'website',
      locale: 'vi_VN',
      url: `https://seplabeo.com/${params.language}/${optimizeSlugify(news.title)}__${news.id}.html`,
      images: [
        {
          url: news.imageUrl,
          width: 800,
          height: 600,
          alt: news.title
        }
      ]
    }
  }
}

export default async function page({ params }: IProps) {
  const route = `/${params.language}`

  const data = await getNewById(getUrlParams(params.id))

  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Trang chủ',
      url: `${route}`
    },
    {
      name: 'Tin tức',
      url: `${route}/tin-tuc`
    },
    {
      name: data?.title,
      url: `${route}/tin-tuc/${optimizeSlugify(data.title)}__${data.id}.html`,
      bold: true
    }
  ]

  return (
    <WrapperPage title={data?.title} breadCrumbs={breadCrumbs} border={false}>
      <main className='mx-auto w-full max-w-4xl'>
        <div className='mb-8 w-full relative'>
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
            quality={100}
            priority={true}
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
