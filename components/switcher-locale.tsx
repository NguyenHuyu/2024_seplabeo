'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import EN from '@/public/en.png'
import VI from '@/public/vi.png'
import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='flex gap-x-3'>
      {i18n.locales.map((locale) => {
        return (
          <Link href={redirectedPathName(locale)} key={locale}>
            {locale === 'vi' ? (
              <Image
                src={VI}
                alt={locale}
                height={300}
                width={300}
                className='h-4 w-7 md:w-full'
              />
            ) : (
              <Image
                src={EN}
                alt={locale}
                height={300}
                width={300}
                className='h-4 w-7 md:w-full'
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}
