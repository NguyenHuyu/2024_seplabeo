import { getProductById } from '@/actions/product.action'
import MainTiptap from '@/components/tiptap/main-tiptap'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Image from 'next/image'

export const SingleProduct = async ({ id }: { id: string }) => {
  const product = await getProductById(id)

  function formatNumber(num: number | null) {
    if (!num) return 0
    return new Intl.NumberFormat('vi-VN').format(num)
  }

  return (
    <div className='grid grid-cols-3 gap-6 md:py-10'>
      <div className='col-span-full lg:col-span-1'>
        <div className=' space-y-2'>
          <Image
            src={product?.imageUrl}
            className='hidden rounded-lg lg:block w-[300px]'
            alt={product?.name}
            height={400}
            width={400}
          />
          {product.picture.length > 1 ? (
            <ScrollArea className='w-[19rem] whitespace-nowrap rounded-md border'>
              <div className='flex w-max space-x-2 p-1'>
                {product?.picture.map((image, index) => (
                  <div className='w-40' key={index}>
                    <Image
                      src={image}
                      className='h-32 object-cover'
                      alt={product?.name}
                      priority
                      height={180}
                      width={180}
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          ) : (
            <ScrollArea className='w-[10rem] whitespace-nowrap rounded-md border'>
              <div className='flex w-max space-x-2 p-1'>
                {product?.picture.map((image, index) => (
                  <div className='w-40' key={index}>
                    <Image
                      src={image}
                      className='h-32 object-cover'
                      alt={product?.name}
                      priority
                      height={180}
                      width={180}
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          )}
        </div>
      </div>
      <div className='col-span-full space-y-4 lg:col-span-2'>
        <div className='flex justify-between'>
          <div className='bg-gradient-to-tr from-cyan-400 to-blue-300 p-4  rounded-full shadow-2xl shadow-orange-400 border-white  border-dashed border-2  flex justify-center items-center '>
            <h1 className='text-black text-sm'>Liên hệ: 0973006622</h1>
          </div>
          <button className='text-sm mt-6 px-4 py-2 bg-orange-400  text-white rounded-lg  tracking-wider hover:bg-orange-500 outline-none'>
            + {formatNumber(product?.price)} VNĐ
          </button>
        </div>
        <div className='p-1 w-full'>
          <div className='flex flex-col items-center  justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md'>
            <h2 className='text-gray-900 text-lg font-bold text-justify'>
              {product.name}
            </h2>
            <div className='text-sm font-semibold '>
              <MainTiptap isEdit={false} editorState={product?.content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
