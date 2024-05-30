// import { getSubstance } from '@/actions/Substance'
import ListProduct from '@/components/ListProduct'
import Chemistry from '@/components/svg/Chemistry'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'
import React from 'react'

interface PageProps {
  params: {
    language: Locale
  }
}

export async function generateMetadata({ params }: PageProps) {
  if (params.language === 'vi') {
    return {
      title: 'Seplabeo | Sản phẩm',
      description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO'
    }
  } else {
    return {
      title: 'Seplabeo | Product',
      description: 'Seplabeo - CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ SEPLABEO'
    }
  }
}

export default async function page({ params }: PageProps) {
  // const data = await getSubstance(params.lang)
  // const parseData = JSON.parse(JSON.stringify(data))
  const { navbar } = await getDictionary(params.language)

  return (
    <div className='py-10 md:my-20'>
      <div className='flex justify-center items-center gap-10'>
        <Chemistry />
        <h1 className='text-center text-4xl md:text-5xl font-bold'>{navbar.title_5}</h1>
      </div>
      {/* <ListProduct data={parseData} langes={langes} /> */}
    </div>
  )
}
