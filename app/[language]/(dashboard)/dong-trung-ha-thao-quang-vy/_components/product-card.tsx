import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export const ProductCard = ({ product, href }: { product: Product; href: string }) => {
  function formatNumber(num: number | null) {
    if (!num) return 0
    return new Intl.NumberFormat('vi-VN').format(num)
  }
  return (
    <Link href={href} className='group block h-40 w-40 md:h-full md:w-full m-2'>
      <div className='md:space-y-2'>
        <div className='relative'>
          {product ? (
            <div className='absolute left-2 top-2 z-10 flex'>
              <div className='rounded bg-gray-600 px-1.5 text-xs font-medium leading-5 text-white'>
                {formatNumber(product?.price)} VNĐ
              </div>
            </div>
          ) : null}
          <Image
            src={product.imageUrl}
            width={400}
            height={400}
            className='relative rounded-xl group-hover:opacity-80 h-40 w-40 md:h-72 md:w-96 object-cover'
            alt={product.name}
          />
        </div>
        <div className='truncate text-sm font-medium text-black group-hover:text-vercel-cyan'>
          {product.name}
        </div>
      </div>
    </Link>
  )
}
