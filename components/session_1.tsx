import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import Image from 'next/image'
import React from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import ListNews from './list-news'
import { jsonData } from '@/data/centerData'

interface Session1Props {
  params: {
    language: Locale
  }
}

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: 'Ornella Binni',
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80'
  },
  {
    artist: 'Tom Byrom',
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80'
  },
  {
    artist: 'Vladimir Malyavko',
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80'
  }
]

export default async function Session1({ params }: Session1Props) {
  const { center } = await getDictionary(params.language)
  return (
    <section className='mx-auto md:max-w-7xl md:space-y-16'>
      <div className='mx-auto'>
        <div className='relative z-40 container mx-auto h-full'>
          <div className='px-4 py-4 lg:px-2 lg:pt-20'>
            <div className='grid gap-10 lg:grid-cols-2 md:mx-24'>
              <div className='flex md:flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg'>
                <div className='max-w-xl mb-6'>
                  <h2 className='max-w-lg mb-3 font-sans md:text-5xl font-bold leading-normal'>
                    {center.title_1}
                  </h2>
                </div>
                <div>
                  <div className='inline-flex items-center justify-start w-full font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800'>
                    {center.title_2}
                    <svg
                      className='inline-block w-3 ml-2'
                      fill='currentColor'
                      viewBox='0 0 12 12'
                    >
                      <path d='M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z'></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center w-full -mx-4 lg:pl-10'>
                <div className='flex flex-col items-end px-3'>
                  <Image
                    className='object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56'
                    src='https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260'
                    alt=''
                    width={200}
                    height={200}
                  />
                  <Image
                    className='object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40'
                    src='https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260'
                    alt=''
                    width={200}
                    height={200}
                  />
                </div>
                <div className='px-3'>
                  <Image
                    className='object-cover w-40 h-40 rounded shadow-lg sm:hbg-green-500ray-50-64 xl:h-80 sm:w-full xl:w-80'
                    src='https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500'
                    alt=''
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-10 max-w-5xl mx-auto'>
        <ScrollArea className='w-full whitespace-nowrap rounded-md border shadow-lg'>
          <div className='flex w-max space-x-4 p-2'>
            {params.language === 'vi'
              ? jsonData.centerDataVI.map((item, index: number) => (
                  <ListNews key={index} item={item} params={params} />
                ))
              : jsonData.centerDataEN.map((item, index: number) => (
                  <ListNews key={index} item={item} params={params} />
                ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </section>
  )
}
