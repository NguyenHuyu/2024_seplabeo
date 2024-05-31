import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowUpRight, Link2 } from 'lucide-react'
import Pagination from '../Pagination'
import { getNews } from '@/actions/news'
import { IProps } from '@/app/[language]/layout'
import { optimizeSlugify } from '@/lib/slug'
import { Link } from 'next-view-transitions'
import { getDictionary } from '@/lib/dictionaries'

export default async function Blog({
  searchParams,
  params
}: {
  searchParams: IProps['searchParams']
  params: IProps['params']
}) {
  const data = await getNews({
    page: Number(searchParams.page),
    size: 6
  })
  const { blogs } = await getDictionary(params.language)

  return (
    <div className='mx-auto p-3 lg:p-0 md:max-w-5xl md:py-10'>
      {data.data.length > 0 && (
        <>
          <div className='flex justify-between'>
            <h1 className='font-bold text-2xl md:text-5xl max-w-xl gradient-text pb-4'>
              {blogs.title_1}
            </h1>
            <Link href={`/${params.language}/tin-tuc`}>
              <Button variant='link'>
                <Link2 />
              </Button>
            </Link>
          </div>
          <div className='divide-y'>
            <ul className='divide-y'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                {data?.data.map((movie) => {
                  const url = `/${params.language}/tin-tuc/${optimizeSlugify(movie.title)}__${movie.id}.html`
                  return (
                    <article
                      key={movie.id}
                      className='flex space-x-4 md:p-3 w-full shadow-lg border border-blue-200 shadow-blue-300 rounded-md  hover:shadow-xl'
                    >
                      <Image
                        src={movie?.imageUrl}
                        alt={movie.title}
                        width={500}
                        height={500}
                        className='flex-none rounded-md bg-slate-100 w-1/3 object-cover hover:scale-105  duration-200'
                      />
                      <div className='min-w-0 relative flex-auto p-1'>
                        <Link href={url} className='absolute -right-1 -top-1'>
                          <Button variant='ghost' className='h-7 py-1 px-2'>
                            <ArrowUpRight size={16} />
                          </Button>
                        </Link>
                        <Link href={url}>
                          <h2 className='font-semibold text-slate-900 truncate pr-4 md:pr-10'>
                            {movie.title}
                          </h2>
                        </Link>
                        <dl className='flex flex-wrap text-sm leading-6 font-medium pr-1'>
                          <div className='flex-none w-full mt-1 font-normal'>
                            <dt className='sr-only'>{movie?.title}</dt>
                            <dd className='text-black/80 line-clamp-3 md:line-clamp-5 text-justify'>
                              {movie?.description}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </article>
                  )
                })}
              </div>
            </ul>
          </div>
          <Pagination pages={data.page} pageSize={data.totalPages} />
        </>
      )}
    </div>
  )
}
