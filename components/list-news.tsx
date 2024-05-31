'use client'
import { Locale } from '@/i18n.config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CenterDataItem } from '@/data/centerData'

interface Props {
  item: CenterDataItem
  params: {
    language: Locale
  }
}

export default function ListNews({ item, params }: Props) {
  return (
    <figure
      key={item.url}
      className='w-full  rounded-t-lg shadow-lg border border-blue-200 shadow-blue-100 my-2'
    >
      <div className='overflow-hidden rounded-md w-[200px]'>
        <Image
          src={item.image}
          alt={`Photo by ${item.title}`}
          className='w-full h-[190px] object-cover'
          width={1000}
          height={1000}
        />
      </div>
      <Link href={`/${params.language}${item.url}`}>
        <figcaption className='p-2 text-xs text-muted-foreground ml-2 inline-block w-44'>
          <p className='font-semibold text-black truncate block'>{item.title}</p>
        </figcaption>
      </Link>
    </figure>
  )
}
