import { StaticImageData } from 'next/image'
import I1 from '@/public/a1.png'
import I2 from '@/public/a2.png'
import I3 from '@/public/a3.png'
import I4 from '@/public/a4.png'
import I5 from '@/public/a5.png'
import I6 from '@/public/a6.png'

export interface CenterDataItem {
  title: string
  image: StaticImageData
  url: string
}

interface CenterData {
  centerDataEN: CenterDataItem[]
  centerDataVI: CenterDataItem[]
}

export const jsonData: CenterData = {
  centerDataEN: [
    {
      title: 'Beverage',
      image: I1,
      url: '/nuoc-giai-khat'
    },
    {
      title: 'Dairy - Desserts',
      image: I2,
      url: 'sua-trang-mieng'
    },
    {
      title: 'Bakery & Confectionery',
      image: I3,
      url: '/banh-keo'
    },
    {
      title: 'Convenience Food, Meat & Seafood processing',
      image: I4,
      url: '/thuc-pham-tien-dung'
    },
    {
      title: 'Seafood & Commodity',
      image: I5,
      url: '/hai-san-san-phan-pho-bien'
    },
    {
      title: 'Functional Food',
      image: I6,
      url: '/thuc-pham-chuc-nang'
    }
  ],
  centerDataVI: [
    {
      title: 'Nước giải khát',
      image: I1,
      url: '/nuoc-giai-khat'
    },
    {
      title: 'Sữa và tráng miệng',
      image: I2,
      url: 'sua-trang-mieng'
    },
    {
      title: 'Bánh kẹo',
      image: I3,
      url: '/banh-keo'
    },
    {
      title: 'Thực phẩm tiện dụng và các sản phẩm chế biến từ thịt và thủy sản',
      image: I4,
      url: '/thuc-pham-tien-dung'
    },
    {
      title: 'Hải sản và sản phẩm phổ biến',
      image: I5,
      url: '/hai-san-san-phan-pho-bien'
    },
    {
      title: 'Thực phẩm chức năng',
      image: I6,
      url: '/thuc-pham-chuc-nang'
    }
  ]
}
