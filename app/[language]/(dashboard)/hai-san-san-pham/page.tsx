import React from 'react'
import A5 from '@/public/a5.png'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps {
  params: {
    language: Locale
  }
}

export async function generateMetadata({ params }: PageProps) {
  if (params.language === 'vi') {
    return {
      title: 'Seplabeo | Hải sản & sản phẩm phổ biến',
      description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO'
    }
  } else {
    return {
      title: 'Seplabeo | Seafood Commodity',
      description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO'
    }
  }
}

export default async function page({ params }: PageProps) {
  const { seafood } = await getDictionary(params.language)

  return (
    <section className='bg-white'>
      <div className='container flex flex-col mx-auto bg-white'>
        <div className='grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5'>
          <div className='flex flex-col justify-center col-span-1 text-center lg:text-start'>
            <div className='flex items-center justify-center mb-4 lg:justify-normal'>
              <Image
                className='h-10'
                src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-1.png'
                alt='logo'
                height={100}
                width={50}
              />
            </div>
            <h1 className='mb-8 text-4xl font-extrabold leading-tight text-dark-grey-900'>
              {seafood.title}
            </h1>
            <div className='grid grid-cols-1 gap-4 items-start justify-center '>
              {seafood.descriptions.map((item, index) => (
                <li
                  key={index}
                  className='mb-1 text-base font-normal leading-7 lg:w-3/4 text-grey-900'
                >
                  {item}
                </li>
              ))}
            </div>
            <div className='flex flex-col items-center gap-4 lg:flex-row'>
              <button className='flex items-center py-4 text-sm font-bold text-white px-7 bg-purple-blue-500 hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 transition duration-300 rounded-xl'>
                Get started now
              </button>
              <Link
                href={`/${params.language}/contact`}
                className='flex items-center py-4 text-sm font-medium px-7 text-dark-grey-700 hover:text-dark-grey-900 transition duration-300 rounded-2xl'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-5 h-5 mr-2'
                >
                  <path
                    fill-rule='evenodd'
                    d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                {seafood.contact}
              </Link>
            </div>
          </div>
          <div className='items-center justify-end col-span-1 md:flex'>
            <Image
              className='w-full md:w-4/5 rounded-md'
              src={A5}
              alt='header image'
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
