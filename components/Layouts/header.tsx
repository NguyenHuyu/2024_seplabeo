'use client'
import { Link } from 'next-view-transitions'
import { Menu, Package2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import LocaleSwitcher from '@/components/switcher-locale'
import LogoImage from '@/public/logo.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Locale } from '@/i18n.config'
import { usePathname } from 'next/navigation'

const navbarVI = [
  {
    label: 'Trang chủ',
    href: '',
    subItems: []
  },
  {
    label: 'Giới thiệu',
    href: '#',
    subItems: [
      {
        label: 'Công ty',
        href: 'cong-ty'
      },
      {
        label: 'Liên hệ',
        href: 'lien-he'
      },
      {
        label: 'Đăng nhập',
        href: 'login'
      }
    ]
  },
  {
    label: 'Ứng dụng',
    href: '#',
    subItems: [
      {
        label: 'Nước giải khát',
        href: 'nuoc-giai-khat'
      },
      {
        label: 'Sữa và tráng miệng',
        href: 'sua-trang-mieng'
      },
      {
        label: 'Bánh kẹo',
        href: 'banh-keo'
      },
      {
        label: 'Thực phẩm',
        href: 'thuc-pham-tien-dung'
      },
      {
        label: 'Hải sản và sản phẩm',
        href: 'hai-san-san-pham'
      },
      {
        label: 'Thực phẩm chức năng',
        href: 'thuc-pham-chuc-nang'
      }
    ]
  },
  // {
  //   label: 'Sản phẩm',
  //   href: 'san-pham',
  //   subItems: []
  // },
  {
    label: 'Đông trùng hạ thảo Quang Vy',
    href: 'dong-trung-ha-thao-quang-vy',
    subItems: []
  }
]
const navbarSVI = [
  {
    label: 'Trang chủ',
    href: '',
    subItems: []
  },
  {
    label: 'Giới thiệu',
    href: '#',
    subItems: [
      {
        label: 'Công ty',
        href: 'cong-ty'
      },
      {
        label: 'Liên hệ',
        href: 'lien-he'
      },
      {
        label: 'Admin',
        href: 'admin'
      }
    ]
  },
  {
    label: 'Ứng dụng',
    href: '#',
    subItems: [
      {
        label: 'Nước giải khát',
        href: 'nuoc-giai-khat'
      },
      {
        label: 'Sữa và tráng miệng',
        href: 'sua-trang-mieng'
      },
      {
        label: 'Bánh kẹo',
        href: 'banh-keo'
      },
      {
        label: 'Thực phẩm',
        href: 'thuc-pham-tien-dung'
      },
      {
        label: 'Hải sản và sản phẩm',
        href: 'hai-san-san-pham'
      },
      {
        label: 'Thực phẩm chức năng',
        href: 'thuc-pham-chuc-nang'
      }
    ]
  },
  // {
  //   label: 'Sản phẩm',
  //   href: 'san-pham',
  //   subItems: []
  // },
  {
    label: 'Đông trùng hạ thảo Quang Vy',
    href: 'dong-trung-ha-thao-quang-vy',
    subItems: []
  }
]
const navbarEN = [
  {
    label: 'Home page',
    href: '',
    subItems: []
  },
  {
    label: 'About us',
    href: '#',
    subItems: [
      {
        label: 'Company',
        href: 'cong-ty'
      },
      {
        label: 'Contact us',
        href: 'lien-he'
      },
      {
        label: 'Login',
        href: 'auth/login'
      }
    ]
  },
  {
    label: 'Applications',
    href: '#',
    subItems: [
      {
        label: 'Beverage',
        href: 'nuoc-giai-khat'
      },
      {
        label: 'Dairy dessert',
        href: 'sua-trang-mieng'
      },
      {
        label: 'Bakary and confectionery',
        href: 'banh-keo'
      },
      {
        label: 'Convenience food',
        href: 'thuc-pham-tien-dung'
      },
      {
        label: 'Seafood and commodity',
        href: 'hai-san-san-pham'
      },
      {
        label: 'Functional food',
        href: 'thuc-pham-chuc-nang'
      }
    ]
  },
  // {
  //   label: 'Products',
  //   href: 'san-pham',
  //   subItems: []
  // },
  {
    label: 'Quang Vy Cordyceps',
    href: 'dong-trung-ha-thao-quang-vy',
    subItems: []
  }
]
const navbarSEN = [
  {
    label: 'Home page',
    href: '',
    subItems: []
  },
  {
    label: 'About us',
    href: '#',
    subItems: [
      {
        label: 'Company',
        href: 'cong-ty'
      },
      {
        label: 'Contact us',
        href: 'lien-he'
      },
      {
        label: 'Admin',
        href: 'admin'
      }
    ]
  },
  {
    label: 'Applications',
    href: '#',
    subItems: [
      {
        label: 'Beverage',
        href: 'nuoc-giai-khat'
      },
      {
        label: 'Dairy dessert',
        href: 'sua-trang-mieng'
      },
      {
        label: 'Bakary and confectionery',
        href: 'banh-keo'
      },
      {
        label: 'Convenience food',
        href: 'thuc-pham-tien-dung'
      },
      {
        label: 'Seafood and commodity',
        href: 'hai-san-san-pham'
      },
      {
        label: 'Functional food',
        href: 'thuc-pham-chuc-nang'
      }
    ]
  },
  // {
  //   label: 'Products',
  //   href: 'san-pham',
  //   subItems: []
  // },
  {
    label: 'Quang Vy Cordyceps',
    href: 'dong-trung-ha-thao-quang-vy',
    subItems: []
  }
]

interface HeaderProps {
  params: {
    language: Locale
  }
  session: any
}

export default function Header({ params, session }: HeaderProps) {
  const pathName = usePathname()

  const itemSelectedNavbarData = {
    vi: session ? navbarSVI : navbarVI,
    en: session ? navbarSEN : navbarEN
  }
  const selectedNavbarData = itemSelectedNavbarData[params.language]

  return (
    <div className='flex w-full flex-col'>
      <header className='sticky top-0 flex h-16 md:h-20 items-center gap-4 border-b bg-background px-4 md:px-6 bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100'>
        <Link
          href={`/${params.language}`}
          className='hidden md:flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Image
            src={LogoImage}
            width={1000}
            height={1000}
            alt='logo'
            className='w-full'
          />
        </Link>
        <nav className='hidden md:flex text-lg font-medium md:items-center md:text-sm'>
          {selectedNavbarData.map((item, index) => {
            const isHighlighted = item.href === (pathName.split('/')[2] || '')

            return (
              <div key={index} className='group inline-block'>
                <Link href={`/${params.language}/${item.href}`}>
                  <Button
                    variant='ghost'
                    className='hover:bg-transparent hover:text-blue-600'
                  >
                    <span
                      className={cn(
                        'pr-1 font-semibold flex-1',
                        isHighlighted && 'text-red-700 font-bold'
                      )}
                    >
                      {item.label}
                    </span>
                    {item.subItems.length > 0 && (
                      <span>
                        <svg
                          className='fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                        </svg>
                      </span>
                    )}
                  </Button>
                </Link>
                {item.subItems.length > 0 && (
                  <ul className='bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32'>
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.href}
                        className='font-medium flex-1 px-3 py-1 cursor-pointer hover:text-blue-600'
                      >
                        <Link href={`/${params.language}/${subItem.href}`}>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='shrink-0 md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
                <Package2 className='h-6 w-6' />
                <span className='sr-only'>Acme Inc</span>
              </Link>
              <Link href='#' className='hover:text-foreground'>
                Dashboard
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Orders
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Products
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Customers
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href='/'
          className='flex md:hidden items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Image src={LogoImage} width={1000} height={1000} alt='logo' className='w-48' />
        </Link>
        <div className='flex md:hidden lg:flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <LocaleSwitcher />
        </div>
      </header>
    </div>
  )
}
