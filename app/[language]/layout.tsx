import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ToastContainer } from 'react-toastify'
import { Metadata } from 'next'
import { Locale } from '@/i18n.config'
import { ViewTransitions } from 'next-view-transitions'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const inter = Inter({
  subsets: ['latin']
})

export interface IProps {
  params: {
    language: Locale
    id?: string
  }
  searchParams: {
    page: string
    size: string
  }
  children?: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL('https://seplabeo.com'),
  alternates: {
    canonical: '/',
    languages: {
      vi: '/vi',
      en: '/en'
    }
  },
  title: {
    default: 'Seplabeo',
    template: `%s | Seplabeo`
  },
  description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO',
  icons: [
    {
      url: '/favicon.ico',
      href: '/favicon.ico'
    },
    {
      url: '/icon.png',
      href: '/icon.png'
    },
    {
      url: '/shortcut-icon.png',
      href: '/shortcut-icon.png'
    },
    {
      url: '/apple-icon.png',
      href: '/apple-icon.png'
    }
  ],
  openGraph: {
    images: [
      {
        url: '/opengraph-image.png',
        href: '/opengraph-image.png'
      }
    ]
  }
}

export default function RootLayout({ children, params }: IProps) {
  return (
    <ViewTransitions>
      <html lang={params.language}>
        <body className={inter.className}>
          {children}
          <Toaster />
          <ToastContainer />
        </body>
      </html>
    </ViewTransitions>
  )
}
