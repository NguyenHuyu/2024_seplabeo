'use client'
import { Banner } from '@/types/banner.types'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface CarouselsProps {
  banner: Banner[]
}

export default function Carousels({ banner }: CarouselsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = banner
  const params = useParams()?.language

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length)
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [images?.length])

  return (
    <div>
      {images?.length > 0 && (
        <div className='relative slider'>
          <Carousel
            selectedItem={currentIndex}
            onChange={(index) => setCurrentIndex(index)}
            infiniteLoop
            autoPlay
            interval={15000}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
          >
            {images.map((imageUrl, index: number) => (
              <div key={index} className='relative h-full object-cover'>
                <Image
                  width={3000}
                  height={3000}
                  priority
                  quality={100}
                  src={imageUrl?.imageUrl[0]}
                  alt={`Image ${index}`}
                  className='object-cover duration-200 md:max-h-[28rem] w-full'
                />
                <span className='absolute text-xl md:text-6xl top-[30%] md:top-[20%] z-40 left-[4%] md:left-[10%] font-serif md:w-[24rem] md:space-y-4'>
                  <div className='flex justify-center items-center font-serif space-y-6'>
                    <h1 className='font-serif text-2xl md:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-red-500 z-30'>
                      {params === 'en'
                        ? 'Chào mừng, SepLaBeo tại Việt Nam'
                        : 'Chào mừng, SepLaBeo tại Việt Nam'}
                    </h1>
                  </div>

                  <div className='flex justify-center items-center font-serif space-y-6'>
                    <Link
                      href={`/${params}/company`}
                      className='absolute text-sm md:text-xl top-[100%] z-40 left-[35%] font-serif  border border-[#3e90fa]  py-2 px-4 bg-transparent text-[#197cfa] font-semibold   rounded hover:bg-[#197cfa] hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                    >
                      {params === 'en' ? 'Discover' : 'Khám phá'}
                    </Link>
                  </div>
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  )
}
