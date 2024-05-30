import Image from 'next/image'
import React, { Suspense } from 'react'
import slugify from 'slugify'
import { SingleProduct } from '../_components/single-product'
import WrapperPage from '@/components/wrapper-page'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'
import { IProps } from '@/app/[language]/layout'
import {
  RecommendedProducts,
  RecommendedProductsSkeleton
} from '../_components/recommended-products'
import { getProductById } from '@/actions/product.action'

// export async function generateMetadata({ params: { id, lang } }: any): Promise<Metadata> {
//   const paramsID = id.split('.')[0]
//   const paramsIDs = paramsID.split('-').reverse()
// //   const data = await getOneProduct(paramsIDs[0])
// //   const parseData: Products = JSON.parse(JSON.stringify(data))

//   return {
//     title: parseData.news.title,
//     description: parseData.news.descriptions,
//     keywords: parseData.news.title,
//     openGraph: {
//       title: parseData.news.title,
//       description: parseData.news.descriptions,
//       type: 'website',
//       locale: 'vi_VN',
//       url: `https://seplabeo.com/${lang}/${slugify(parseData.news.title)}/${parseData.news._id}.html`,
//       images: [
//         {
//           url: parseData.news.images[0],
//           width: 800,
//           height: 600,
//           alt: parseData.news.title
//         }
//       ]
//     }
//   }
// }

export default async function page({ params }: IProps) {
  const route = `/${params.language}`
  const product = await getProductById(params?.id || '')
  const breadCrumbs: IBreadcrumb[] = [
    {
      name: 'Trang chủ',
      url: `${route}`
    },
    {
      name: 'Đông trùng hạ thảo Quang Vy',
      url: `${route}/dong-trung-ha-thao-quang-vy`
    },
    {
      name: product.name,
      url: `${route}/dong-trung-ha-thao-quang-vy/${params.id}`,
      bold: true
    }
  ]
  return (
    <div className='max-w-5xl mx-auto'>
      <Breadcrumbs breadCrumbs={breadCrumbs} />
      <div className='m-4'>
        <SingleProduct id={params?.id || ''} />

        <Suspense fallback={<RecommendedProductsSkeleton />}>
          <RecommendedProducts
            id={params.id || ''}
            path='/vi/dong-trung-ha-thao-quang-vy'
          />
        </Suspense>
      </div>
    </div>
  )
}
