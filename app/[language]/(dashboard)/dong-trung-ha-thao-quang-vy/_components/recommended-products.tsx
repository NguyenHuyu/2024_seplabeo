import { Product } from '@/app/api/products/product'
import { ProductCard } from './product-card'
import { getProductsRemoveId } from '@/actions/product.action'

export async function RecommendedProducts({ path, id }: { path: string; id: string }) {
  const products = await getProductsRemoveId(id)

  return (
    <div className='space-y-6 py-8'>
      <div>
        {/* <div className='text-lg font-medium text-black'>Recommended Products for You</div> */}
        <div className='text-lg font-medium text-black'>Sản phẩm khác</div>

        <div className='text-sm text-gray-400'>Sản phẩm khác có thể bạn quan tâm</div>
      </div>
      <div className='grid grid-cols-4 gap-6'>
        {products.map((product) => (
          <div key={product.id} className='col-span-4 lg:col-span-1'>
            <ProductCard product={product} href={`${path}/${product.id}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`

function ProductSkeleton() {
  return (
    <div className='col-span-4 space-y-4 lg:col-span-1'>
      <div className={`relative h-[167px] rounded-xl bg-gray-300 ${shimmer}`} />

      <div className='h-4 w-full rounded-lg bg-gray-300' />
      <div className='h-6 w-1/3 rounded-lg bg-gray-300' />
      <div className='h-4 w-full rounded-lg bg-gray-300' />
      <div className='h-4 w-4/6 rounded-lg bg-gray-300' />
    </div>
  )
}

export function RecommendedProductsSkeleton() {
  return (
    <div className='space-y-6 pb-[5px] py-8'>
      <div className='space-y-2'>
        <div className={`h-6 w-1/3 rounded-lg bg-gray-300 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-gray-300 ${shimmer}`} />
      </div>

      <div className='grid grid-cols-4 gap-6'>
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </div>
  )
}
