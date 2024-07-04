// import { getSubstance } from '@/actions/Substance'
import ListProduct from '@/components/ListProduct'
import Chemistry from '@/components/svg/Chemistry'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LP_GRID_ITEMS } from '@/item'

interface PageProps {
  params: {
    language: Locale
  }
}

export async function generateMetadata({ params }: PageProps) {
  if (params.language === 'vi') {
    return {
      title: 'Seplabeo | Sản phẩm',
      description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO'
    }
  } else {
    return {
      title: 'Seplabeo | Product',
      description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO'
    }
  }
}

export default async function page({ params }: PageProps) {
  const { navbar } = await getDictionary(params.language)

  return (
    <div className='container mx-auto md:max-w-5xl'>
      <section className='bg-white dark:bg-gray-900'>
        <div className='mx-auto grid max-w-screen-xl px-4 py-8 text-center'>
          <div className='mx-auto place-self-center'>
            <h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl'>
              Sản phẩm
            </h1>
          </div>
        </div>
      </section>
      <section className='bg-white dark:bg-gray-900'>
        <div className='mx-auto max-w-screen-xl px-4 py-4'>
          <div className='justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3'>
            {LP_GRID_ITEMS.map((singleItem) => (
              <div
                key={singleItem.title}
                className='flex flex-col items-center justify-center text-center'
              >
                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 p-1.5 text-blue-700 dark:bg-primary-900 lg:h-12 lg:w-12'>
                  {singleItem.icon}
                </div>
                <h3 className='mb-2 text-xl font-bold dark:text-white'>
                  {singleItem.title}
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  {singleItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
