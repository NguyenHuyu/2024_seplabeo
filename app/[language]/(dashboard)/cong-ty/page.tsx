import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Image from 'next/image'
import React from 'react'
import ImageBT1 from '@/public/bt1.jpg'

interface Props {
  params: {
    language: Locale
  }
}

export async function generateMetadata({ params }: Props) {
  if (params.language === 'vi') {
    return {
      title: 'Seplabeo | Công ty',
      description: 'Công ty - Seplabeo'
    }
  } else {
    return {
      title: 'Seplabeo | Company',
      description: 'Company - Seplabeo'
    }
  }
}

export default async function page({ params }: Props) {
  const langes = await getDictionary(params.language)
  return (
    <div className='bg-white py-4'>
      <section className='dark:bg-gray-900'>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='mb-4 py-2 text-4xl font-bold leading-none md:text-5xl xl:text-6xl  text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600 '>
              {langes.company.company_title}
            </h1>
            <p className='max-w-2xl mb-1 font-medium text-black lg:mb-2 md:text-lg lg:text-xl '>
              {langes.company.company_address}
            </p>
            <p className='max-w-2xl mb-1 font-medium text-black lg:mb-2 md:text-lg lg:text-xl '>
              {langes.company.company_phone_1}
            </p>
            <p className='max-w-2xl mb-1 font-medium text-black lg:mb-2 md:text-lg lg:text-xl '>
              {langes.company.company_phone_2}
            </p>
            <p className='max-w-2xl mb-1 font-medium text-black lg:mb-2 md:text-lg lg:text-xl '>
              {langes.company.company_email}
            </p>
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <Image
              src={ImageBT1}
              alt='seplabeo'
              width={1000}
              height={1000}
              className='rounded-lg'
            />
          </div>
        </div>
      </section>
      <div className='md:container mx-auto w-full h-full py-10 shadow-xl'>
        <h2 className='text-center text-2xl md:text-4xl font-bold md:py-4'>
          {langes.company.company_process}
        </h2>
        <div className='relative wrap overflow-hidden p-2 md:p-10 h-full'>
          <div
            className='border-2-2 absolute border-opacity-20 border-gray-700 h-full border'
            style={{ left: '50%' }}
          ></div>
          <div className='mb-8 flex justify-between items-center w-full right-timeline'>
            <div className='order-1 w-5/12'></div>
            <div className=' flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full'>
              <h1 className='mx-auto font-semibold text-lg text-white'>2017</h1>
            </div>
            <div className='order-1 bg-[#187cfa] rounded-lg shadow-xl w-5/12 px-6 py-4'>
              <h3 className='mb-3 font-bold text-white text-center md:text-justify text-md md:text-xl'>
                {langes.company.company_process_1}
              </h3>{' '}
            </div>
          </div>

          <div className='mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline'>
            <div className='order-1 w-5/12'></div>
            <div className=' flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full'>
              <h1 className='mx-auto text-white font-semibold text-lg'>2018</h1>
            </div>
            <div className='order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4'>
              <h3 className='mb-3 font-bold text-white text-center md:text-justify text-md md:text-xl'>
                {langes.company.company_process_2}
              </h3>
            </div>
          </div>

          <div className='mb-8 flex justify-between items-center w-full right-timeline'>
            <div className='order-1 w-5/12'></div>
            <div className=' flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full'>
              <h1 className='mx-auto font-semibold text-lg text-white'>2019</h1>
            </div>
            <div className='order-1 bg-[#187cfa] rounded-lg shadow-xl w-5/12 px-6 py-4'>
              <h3 className='mb-3 font-bold text-white text-center md:text-justify text-md md:text-xl'>
                {langes.company.company_process_3}
              </h3>
            </div>
          </div>

          <div className='mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline'>
            <div className='order-1 w-5/12'></div>
            <div className=' flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full'>
              <h1 className='mx-auto text-white font-semibold text-lg'>2022</h1>
            </div>
            <div className='order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4'>
              <h3 className='mb-3 font-bold text-white text-center md:text-justify text-md md:text-xl'>
                {langes.company.company_process_4}
              </h3>
            </div>
          </div>
        </div>
        <section className='bg-white dark:bg-gray-900'>
          <div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
            <div className='font-light  sm:text-lg dark:text-gray-400'>
              <h2 className='mb-4 text-4xl font-extrabold text-gray-900 dark:text-white'>
                SEPLABEO
              </h2>
              <p className='mb-4'>{langes.company.company_sub_1}</p>
              {/* <p>{langes.company.company_sub_2}</p> */}
            </div>
            <div className='grid grid-cols-2 gap-4 mt-8'>
              <Image
                width={1000}
                height={1000}
                className='w-full rounded-lg'
                src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png'
                alt='office content 1'
              />
              <Image
                width={1000}
                height={1000}
                className='mt-4 w-full lg:mt-10 rounded-lg'
                src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png'
                alt='office content 2'
              />
            </div>
          </div>
        </section>
      </div>
      <div className='relative'>
        <div className='sticky top-0 flex h-screen items-center justify-center'>
          <Image
            width={1000}
            height={1000}
            src='https://www.stockvault.net/data/2012/10/29/137060/preview16.jpg'
            alt='images-seplabeo'
            className='h-full w-full object-cover'
          />{' '}
          <div className='absolute left-0 right-0 m-auto flex w-2/4 flex-col items-start justify-center gap-4 p-10 backdrop-blur-xl'>
            <h2 className='text-2xl md:text-5xl font-bold'>
              {langes.company.company_vision}
            </h2>
            <p className='font-sans text-md md:text-2xl  text-black'>
              {langes.company.company_vision_sub}
            </p>
          </div>
        </div>
        <div className='sticky top-0 flex h-screen items-center justify-center'>
          <Image
            width={1000}
            height={1000}
            src='https://www.stockvault.net/data/2014/10/06/163147/preview16.jpg'
            alt='images-seplabeo'
            className='h-full w-full object-cover'
          />
          <div className='absolute left-0 right-0 m-auto flex w-2/4 flex-col items-start justify-center gap-4 p-10 backdrop-blur-xl'>
            <h2 className='text-2xl md:text-5xl font-bold'>
              {langes.company.company_mission}
            </h2>
            <p className='font-sans text-md md:text-2xl  text-black'>
              {langes.company.company_mission_sub}
            </p>{' '}
          </div>
        </div>

        <div className='sticky top-0 flex h-screen items-center justify-center'>
          <Image
            width={1000}
            height={1000}
            src='https://www.stockvault.net/data/2012/10/29/137060/preview16.jpg'
            alt='images-seplabeo'
            className='h-full w-full object-cover'
          />
          <div className='absolute left-0 right-0 m-auto flex w-2/4 flex-col items-start justify-center gap-4 p-10 backdrop-blur-xl'>
            <h2 className='text-2xl md:text-5xl font-bold'>
              {langes.company.company_value}
            </h2>
            <p className='font-sans text-md md:text-2xl  text-black'>
              {langes.company.company_value_sub}
            </p>
          </div>
        </div>

        <div className='sticky top-0 flex h-screen items-center justify-center'>
          <Image
            width={1000}
            height={1000}
            src='https://www.stockvault.net/data/2014/10/06/163147/preview16.jpg'
            alt='images-seplabeo'
            className='h-full w-full object-cover'
          />
          <div className='absolute left-0 right-0 m-auto flex w-2/4 flex-col items-start justify-center gap-4 p-10 backdrop-blur-xl'>
            <h2 className='text-2xl md:text-5xl font-bold'>
              {langes.company.company_philosophy}
            </h2>
            <p className='font-sans text-md md:text-2xl  text-black'>
              {langes.company.company_philosophy_sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
