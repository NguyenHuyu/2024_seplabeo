import Blog from '@/components/home/blogs'
import Carousels from '@/components/home/caroursel'
import Session1 from '@/components/session_1'
import SubMain from '@/components/sub_main'
import { IProps } from '../layout'
import { getBanners } from '@/actions/banner'

export default async function Home({ params, searchParams }: IProps) {
  const banners = await getBanners()

  return (
    <div className='w-full'>
      <Carousels banner={banners} />

      <Session1 params={params} />

      <Blog params={params} searchParams={searchParams} />

      <SubMain />
    </div>
  )
}
