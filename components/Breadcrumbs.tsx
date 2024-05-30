'use client'
import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IBreadcrumb = {
  name: string
  url: string
  bold?: boolean
}

type BreadcrumbItem = IBreadcrumb & {
  length: number
  index: number
}
interface BreadcrumbsProps {
  breadCrumbs?: IBreadcrumb[]
}

export default function Breadcrumbs({ breadCrumbs }: BreadcrumbsProps) {
  const BreadCrumbItem = ({ name, url, bold, index, length }: BreadcrumbItem) => {
    return (
      <li className='inline-flex items-center justify-start'>
        <Link
          href={url}
          className={cn(
            'italic hover:text-cyan-500 font-semibold text-[15px] md:text-[18px] pr-2 truncate max-w-[20rem]',
            bold ? 'text-cyan-500' : 'text-black'
          )}
        >
          {name}
        </Link>
        {index < length - 1 && <ChevronRight size={18} />}
      </li>
    )
  }

  return (
    <section className='md:ml-4 py-2 sm:py-2 drop-shadow-lg md:flex justify-center items-center'>
      <div className='px-2 flex justify-between md:justify-start w-full gap-10'>
        <ol className='flex flex-wrap text-gray-600 items-start justify-start'>
          {breadCrumbs?.map((breadCrumb, index) => (
            <BreadCrumbItem
              index={index}
              key={index}
              bold={breadCrumb?.bold}
              name={breadCrumb.name}
              url={breadCrumb.url}
              length={breadCrumbs.length}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
