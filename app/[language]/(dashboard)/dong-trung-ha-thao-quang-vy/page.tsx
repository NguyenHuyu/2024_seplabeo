import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { Facebook, Mail, MailMinus, Phone, PhoneCall, Rss } from 'lucide-react'
import type { Metadata } from 'next'
import ImageP1 from '@/public/p1.png'
import IP1 from '@/public/Picture1.png'
import Imge from '@/public/t222.jpg'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import slugify from 'slugify'
import Product from '@/components/cordyceps/product'
import SVG1 from '@/components/svg/svg1'
import SVG2 from '@/components/svg/svg2'
import { Button } from '@/components/ui/button'
import { getVideos } from '@/actions/video.action'

interface Props {
  params: {
    language: Locale
  }
  searchParams: any
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.language === 'vi') {
    return {
      title:
        'Seplabeo | Đông trùng hạ thảo Quang Vy - Đông trùng hạ thảo tinh chất dừa - Đông Trùng Hạ Thảo Quang Vy tinh chất dừa ',
      description: 'Đông trùng hạ thảo Quang Vy - Seplabeo',
      keywords:
        'Đông trùng hạ thảo Quang Vy, Đông trùng hạ thảo tinh chất dừa, Đông Trùng Hạ Thảo Quang Vy tinh chất dừa',
      openGraph: {
        title: 'Seplabeo - Đông trùng hạ thảo',
        description: 'Đông trùng hạ thảo Quang Vy tinh chất dừa - Seplabeo',
        images: ['/p1.png']
      }
    }
  } else {
    return {
      title: 'Seplabeo | Quang Vy Cordyceps',
      description: 'Quang Vy Cordyceps - Seplabeo',
      keywords:
        'Đông trùng hạ thảo Quang Vy, Đông trùng hạ thảo tinh chất dừa, Đông Trùng Hạ Thảo Quang Vy tinh chất dừa',
      openGraph: {
        title: 'Seplabeo - Đông trùng hạ thảo',
        description: 'Đông trùng hạ thảo Quang Vy tinh chất dừa - Seplabeo',
        images: ['/p1.png']
      }
    }
  }
}

export default async function page({ params, searchParams }: Props) {
  const { cordyceps } = await getDictionary(params.language)
  const videos = await getVideos()

  return (
    <div>
      <section className='bg-white dark:bg-gray-900'>
        <div className='mx-auto grid items-center container md:max-w-screen-2xl px-4 py-4 text-center'>
          <div className='mx-auto place-self-center space-y-8'>
            <div className='flex justify-between items-center'>
              <div className='w-full sm:w-1/2'>
                <Image
                  src={IP1}
                  alt=''
                  width={1000}
                  height={1000}
                  className='w-full md:h-96 object-contain rounded-lg'
                />
              </div>
              <h1 className='mb-4 max-w-3xl text-2xl leading-8 md:leading-none font-extrabold  tracking-tight text-red-700 md:text-5xl xl:text-6xl animation-container-down'>
                {cordyceps.cordyceps_name}
              </h1>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between'>
              <div className='text-sm leading-6 col-start-1 sm:col-span-2 lg:row-start-4 lg:col-span-1 dark:text-slate-400  animation-container-left-right'>
                <strong>
                  <p className='font-extrabold text-lg md:mt-3 mb-4 md:px-2 text-black'>
                    {cordyceps.cordyceps_bold}
                  </p>
                </strong>
                {cordyceps.cordyceps_title.map((item, index) => (
                  <p
                    className='leading-normal text-left md:text-base mb-4 md:mb-2 px-2'
                    key={index}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <div className='block md:hidden my-5'>
                <Link href={`/${params.language}/lien-he`}>
                  <Button>{cordyceps.contact}</Button>
                </Link>
              </div>
              <div className='animation-container-right-left'>
                <dl className='mt-4 text-xs font-medium flex flex-col gap-4 items-start row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2'>
                  <dt className='sr-only'>Mail</dt>
                  <dd className='flex items-center dark:text-indigo-400 gap-2'>
                    <Mail />
                    <span>
                      <span className='text-black font-normal md:text-base'>
                        dthtquangvy@gmail.com
                      </span>
                    </span>
                  </dd>
                  <dt className='sr-only'>Hotline</dt>
                  <dd className='flex items-center  gap-2'>
                    <PhoneCall />
                    <span>
                      <span className='text-black font-normal md:text-base'>
                        0973006622 – 0961097953
                      </span>
                    </span>
                  </dd>
                  <dt className='sr-only'>Fanpage</dt>
                  <dd>
                    <Link
                      href='https://www.facebook.com/dthtquangvy.seplabeo'
                      className='flex items-center gap-2'
                    >
                      <Rss />
                      <span>
                        <span className='text-black font-normal md:text-base'>
                          Fanpage - Seplabeo
                        </span>
                      </span>
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>

            <div className=' hidden md:block md:mt-4'>
              <Link href={`/${params.language}/lien-he`}>
                <Button>{cordyceps.contact}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white py-4 md:py-8 mx-auto'>
        <div className='container max-w-5xl mx-auto'>
          <h1 className='w-full my-4 text-3xl md:text-5xl leading-tight text-center text-[#bf1f2f] font-bold'>
            {cordyceps.intro}
          </h1>

          <div className='mb-6 flex justify-between items-center w-full right-timeline'>
            <div className='order-1 bg-white border rounded-lg shadow-xl w-full px-6 py-4'>
              <h3 className='mb-3 font-bold text-gray-800 text-xl'>4/2022</h3>
              <p className='text-sm leading-snug tracking-wide text-gray-900 text-opacity-100'>
                {cordyceps.product_1}
              </p>
            </div>
          </div>
          <div className='mb-6 flex justify-between items-center w-full right-timeline'>
            <div className='order-1 bg-white border rounded-lg shadow-xl w-full px-6 py-4'>
              <h3 className='mb-3 font-bold text-gray-800 text-xl'>7/2022</h3>
              <p className='text-sm leading-snug tracking-wide text-gray-900 text-opacity-100'>
                {cordyceps.product_2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Product params={params} searchParams={searchParams} />

      {/* <section className='bg-gray-100 py-8'>
        <div className='max-w-4xl mx-auto px-2 pt-4 pb-12 text-gray-800 '>
          <h1 className='w-full my-2 md:text-5xl mb-6 leading-tight text-center text-[#bf1f2f] font-bold'>
            {cordyceps.more}
          </h1>
          {videos[0].videoUrl && videos[0].videoUrl}
        </div>
      </section> */}
    </div>
  )
}
