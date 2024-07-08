import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import type { Metadata } from 'next'
import React from 'react'

interface Props {
  params: {
    language: Locale
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.language === 'vi') {
    return {
      title: 'Seplabeo | Liên hệ',
      description: 'Liên hệ - Seplabeo',
      openGraph: {
        title: 'Seplabeo | Liên hệ',
        description: 'Liên hệ - Seplabeo',
        type: 'website',
        locale: 'vi_VN',
        url: 'https://seplabeo.com/lien-he',
        images: ['https://seplabeo.com/app.png']
      }
    }
  } else {
    return {
      title: 'Seplabeo | Contact',
      description: 'Contact - Seplabeo',
      openGraph: {
        title: 'Seplabeo | Contact',
        description: 'Contact - Seplabeo',
        type: 'website',
        locale: 'en-US',
        url: 'https://seplabeo.com/lien-he',
        images: ['https://seplabeo.com/app.png']
      }
    }
  }
}

export default async function ContactPage({ params }: Props) {
  const { contact } = await getDictionary(params.language)

  return (
    <section className='relative bg-blueGray-50  my-10 md:py-20'>
      <div className='relative pt-16 pb-32 flex text-white content-center items-center justify-center min-h-screen-75'>
        <div
          className='absolute top-0 w-full h-full bg-center bg-cover'
          style={{ backgroundImage: "url('/contact.jpg')" }}
        >
          <span
            id='blackOverlay'
            className='w-full h-full absolute opacity-75 bg-black'
          ></span>
        </div>
        <div className='container relative mx-auto'>
          <div className='items-center flex'>
            <div className='w-full  px-4  text-center'>
              <h1 className='text-7xl  font-medium'>{contact.title_1}</h1>
              <p className='mt-4 md:text-xl'>{contact.title_2}</p>
              <p className='mt-6 md:text-xl'>{contact.title_3}</p>
              <p className='mt-6 md:text-xl'>{contact.title_3_1}</p>
              <div className='font-serif mt-4 text-xs md:text-xl'>
                {contact.title_4} <br />
              </div>
            </div>
          </div>
        </div>
        <div className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px translate-y-0'>
          <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
          >
            <polygon
              className='text-blueGray-200 fill-current'
              points='2560 0 2560 100 0 100'
            ></polygon>
          </svg>
        </div>
      </div>
      <section className='pb-10 bg-blueGray-200'>
        <div className='mx-auto w-full max-w-lg pb-20 p-4'>
          <form className='mt-10 relative '>
            <input type='hidden' />
            <div className='grid gap-10 sm:grid-cols-2'>
              <div className='relative z-0'>
                <input
                  type='text'
                  name='name'
                  className='peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
                  {contact.title_5}
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  name='email'
                  className='peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
                  {contact.title_6}
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  name='company'
                  className='peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
                  {contact.title_7}
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  name='country'
                  className='peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
                  {contact.title_8}
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  name='department'
                  className='peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
                  {contact.title_9}
                </label>
              </div>
              <div className='relative z-0 col-span-2'>
                <textarea
                  name='message'
                  rows={2}
                  className='peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
                  {contact.title_10}
                </label>
              </div>
            </div>
            <button className='absolute left-[40%] -bottom-16 py-2 px-6 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
              {contact.title_11}
            </button>
          </form>
        </div>
      </section>
    </section>
  )
}
