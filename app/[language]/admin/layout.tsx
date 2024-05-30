import { Locale } from '@/i18n.config'
import React from 'react'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import LogoutButton from '@/components/logout-button'
import { getSession } from '@/hooks/getSession'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    language: Locale
  }
  children: React.ReactNode
}

export default async function page({ children, params }: Props) {
  const session = await getSession()

  if (!session) {
    redirect(`/${params.language}/login`)
  }

  const data = [
    {
      name: 'Banner',
      url: `/vi/admin/banner`
    },
    {
      name: 'Bản tin',
      url: `/vi/admin/news`
    },
    {
      name: 'Sản phẩm',
      url: `/vi/admin/product`
    }
  ]
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='z-30 sticky top-0 flex h-16 items-center gap-4 border-b bg-background justify-between px-4'>
        <nav className='hidden gap-6 text-lg font-medium md:flex md:flex-row  md:items-center md:gap-5 md:text-sm lg:gap-6 w-full'>
          <Link
            href={'/vi/admin'}
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Link
            href='/'
            className='text-muted-foreground transition-colors hover:text-foreground'
          >
            Home
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href={'/vi/admin'}
                className='flex items-center gap-2 text-lg font-semibold md:text-base'
              >
                <Package2 className='h-6 w-6' />
                <span className='sr-only'>Acme Inc</span>
              </Link>
              {data.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className='text-muted-foreground transition-colors hover:text-foreground '
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className='flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Accounst</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-1'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Dashboard</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <nav className='hidden md:grid gap-4 text-sm text-muted-foreground p-2'>
            {data.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className='transition-colors hover:text-foreground font-semibold text-primary '
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div>{children}</div>
        </div>
      </main>
    </div>
  )
}
