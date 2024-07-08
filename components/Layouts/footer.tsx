import React from 'react'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'

interface FooterProps {
  params: {
    language: Locale
  }
}

export default async function Footer({ params }: FooterProps) {
  const { footer } = await getDictionary(params.language)
  return (
    <footer className='bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100'>
      <div className='max-w-screen-2xl px-4 py-16 mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row items-center'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div>
            <div className='text-xl cursor-pointer font-serif'>SEPLABEO</div>
            <p className='max-w-xs mt-4 text-sm text-gray-600'>{footer.title_1} </p>
            <div className='flex mt-8 space-x-6 text-gray-600'>
              <a
                className='hover:opacity-75'
                target='_blank'
                rel='noreferrer'
                href='https://www.facebook.com/dthtquangvy.seplabeo'
              >
                <span className='sr-only'> Facebook </span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <p className='mt-8 text-base text-gray-800'>©2023 Bản quyền thuộc về SEPLABEO</p>
      </div>
    </footer>
  )
}
