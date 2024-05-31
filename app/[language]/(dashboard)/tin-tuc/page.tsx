import Image from 'next/image'
import React from 'react'
import { IProps } from '../../layout'
import { getNews } from '@/actions/news'
import { optimizeSlugify } from '@/lib/slug'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'next-view-transitions'
import Pagination from '@/components/Pagination'

export default async function Blog({ searchParams, params }: IProps) {
  const data = await getNews({
    page: Number(searchParams.page)
  })

  return (
    <div className='mx-auto container md:max-w-5xl py-10'>
      <h1 className='font-bold text-4xl md:text-5xl max-w-xl gradient-text pb-4'>
        Tin tức
      </h1>
      <div className='divide-y divide-slate-100'>
        <ul className='divide-y divide-slate-100'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {data?.data.map((movie) => {
              const url = `/${params.language}/tin-tuc/${optimizeSlugify(movie.title)}__${movie.id}.html`
              return (
                <article
                  key={movie.id}
                  className='flex space-x-4 p-3 w-full border border-zinc-200 rounded-md shadow-md hover:shadow-xl'
                >
                  <Image
                    src={movie?.imageUrl}
                    alt={movie.title}
                    width={500}
                    height={500}
                    className='flex-none rounded-md bg-slate-100 w-1/3 object-cover hover:scale-105  duration-200'
                  />
                  <div className='min-w-0 relative flex-auto'>
                    <Link href={url} className='absolute -right-1 -top-1'>
                      <Button variant='ghost' className='h-7 py-1 px-2'>
                        <ArrowUpRight size={16} />
                      </Button>
                    </Link>
                    <Link href={url}>
                      <h2 className='font-semibold text-slate-900 truncate pr-10'>
                        {movie.title}
                      </h2>
                    </Link>
                    <dl className='flex flex-wrap text-sm leading-6 font-medium'>
                      <div className='flex-none w-full mt-2 font-normal'>
                        <dt className='sr-only'>{movie?.title}</dt>
                        <dd className='text-slate-400 line-clamp-5 text-justify'>
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
    </div>
  )
}
