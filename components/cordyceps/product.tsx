import { getProducts } from '@/actions/product.action'
import { IProps } from '@/app/[language]/layout'
import { getDictionary } from '@/lib/dictionaries'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Pagination from '../Pagination'

interface Props {
  params: IProps['params']
  searchParams: IProps['searchParams']
}

function formatNumber(num: number | null) {
  if (!num) return 0
  return new Intl.NumberFormat('vi-VN').format(num)
}

export default async function Product({ params, searchParams }: Props) {
  const products = await getProducts({
    page: Number(searchParams?.page)
  })

  const { cordyceps } = await getDictionary(params.language)

  return (
    <div className='container mx-auto'>
      <h2 className='w-full text-3xl md:text-5xl font-bold leading-tight text-center text-[#bf1f2f]'>
        {cordyceps.product}
      </h2>
      <div className='max-w-5xl mx-auto w-full rounded-xl p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.data.map((item) => (
            <div
              key={item.id}
              className='flex flex-col md:w-80 bg-slate-50 rounded-2xl border-2 border-gray-300 shadow-lg overflow-hidden'
            >
              <div className=''>
                <div className='relative w-full mb-3 z-40 border-b'>
                  <Image
                    width={500}
                    height={500}
                    src={`${item.imageUrl}`}
                    alt='Seplabeo'
                    className='h-52 w-full object-cover  rounded-t-2xl '
                  />
                </div>
                <div>
                  <div className='flex-auto justify-evenly p-3 text-black'>
                    <div className='flex flex-wrap '>
                      <div className='flex items-center w-full justify-between min-w-0 '>
                        <h2 className='text-xl font-bold mr-auto cursor-pointer  hover:text-purple-500 truncate '>
                          {item?.name}
                        </h2>
                      </div>
                    </div>
                    <div className='text-md font-medium my-4'>
                      {formatNumber(item?.price)} VND
                    </div>
                    <Link
                      href={`/${params.language}/dong-trung-ha-thao-quang-vy/${item.id}`}
                    >
                      <div className='flex space-x-2 text-sm font-medium justify-start'>
                        <button className='transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-400 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 '>
                          <span>Xem chi tiết</span>
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination pages={products.page} pageSize={products.total} />
      </div>
    </div>
  )
}
