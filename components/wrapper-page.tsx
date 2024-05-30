'use client'
import React, { Fragment } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Breadcrumbs, { IBreadcrumb } from '@/components/Breadcrumbs'
import Pagination from '@/components/Pagination'
import InputPattern, { IInputOption } from './input-pattern'
import ButtonPattern, { IListButton } from './button-pattern'
import { cn } from '@/lib/utils'

interface WrapperPageProps {
  children?: React.ReactNode
  breadCrumbs?: IBreadcrumb[]
  listSelectOptions?: IInputOption[]
  size?: boolean
  title?: string
  dataList?: {
    data: any[]
    page?: number
    totalPages?: number
  }
  listButton?: IListButton[]
  border?: boolean
}

export default function WrapperPage({
  children,
  breadCrumbs,
  dataList,
  size,
  listSelectOptions,
  title,
  listButton,
  border = true
}: WrapperPageProps) {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbs={breadCrumbs} />
      <div
        className={cn('flex px-3', listSelectOptions ? 'justify-between' : 'justify-end')}
      >
        {listSelectOptions && <InputPattern listSelectOptions={listSelectOptions} />}
        {listButton && <ButtonPattern listButton={listButton} />}
      </div>

      {title && (
        <h1 className='text-center text-lg md:text-2xl font-bold py-1 text-red-500 max-w-5xl mx-auto'>
          {title}
        </h1>
      )}

      <ScrollArea
        className={cn(
          'w-full md:w-full whitespace-nowrap rounded-md lg:h-full p-2',
          border ? 'border' : 'border-none'
        )}
      >
        {children}
        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      <div className='flex justify-between px-3 items-center'>
        {dataList && dataList?.data?.length > 0 && (
          <div className='flex justify-center items-center'>
            <Pagination pages={dataList?.page} pageSize={dataList?.totalPages} />
          </div>
        )}
      </div>
    </Fragment>
  )
}
