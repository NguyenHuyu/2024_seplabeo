import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export const ProductCard = ({ product, href }: { product: Product; href: string }) => {
  return (
    <Link href={href} className='group block'>
      <div className='space-y-2'>
        <div className='relative'>
          {product ? (
            <div className='absolute left-2 top-2 z-10 flex'>
              <div className='rounded bg-gray-600 px-1.5 text-xs font-medium leading-5 text-white'>
                Best Seller
              </div>
            </div>
          ) : null}
          <Image
            src={product.imageUrl}
            width={400}
            height={400}
            className='relative rounded-xl group-hover:opacity-80 h-72 w-full object-cover'
            alt={product.name}
          />
          <div className='absolute bottom-2 left-4 text-sm font-medium text-black group-hover:text-vercel-cyan'>
            {product?.price} VNĐ
          </div>
        </div>
        <div className='truncate text-sm font-medium text-black group-hover:text-vercel-cyan'>
          {product.name}
        </div>
      </div>
    </Link>
  )
}
