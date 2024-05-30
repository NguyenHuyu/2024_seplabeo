'use client'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { getQueryParams } from '@/lib/helpers'
import { Button } from './ui/button'
import { Link } from 'next-view-transitions'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
  pages: number | any
  pageSize?: number | any
}

const RANGE = 2

export default function Pagination({ pageSize, pages }: Props) {
  const router = useRouter()

  const pageSearch = useSearchParams()?.get('page')

  const [page, setPage] = React.useState(pages)

  useEffect(() => {
    if (pageSearch) {
      setPage(Number(pageSearch))
    } else {
      setPage(1)
    }
  }, [pageSearch])

  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            key={index}
            className='bg-white rounded w-6 py-1 shadow-sm mx-2 text-[8px] cursor-pointer border'
          >
            ...
          </button>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button
            key={index}
            className='bg-white rounded w-6 py-1 shadow-sm mx-2 text-[8px] cursor-pointer border'
          >
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index)
        }

        return (
          <Button
            key={index}
            size='sm'
            onClick={() => {
              let queryParams = new URLSearchParams(window.location.search)

              queryParams = getQueryParams(queryParams, 'page', pageNumber)

              const path = window.location.pathname + '?' + queryParams.toString()
              router.push(path, {
                scroll: false
              })
            }}
            className={classNames(
              'bg-white hover:text-white text-black rounded h-7 w-7 shadow-lg hover:-translate-y-1 transition-all duration-400 mx-1.5 cursor-pointer',
              {
                'border-cyan-500 text-white bg-black': pageNumber === page,
                'border ': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Button>
        )
      })
  }

  const isFirstPage = page === 1
  const isLastPage = page === pageSize

  return (
    <div className='flex flex-wrap mt-6 justify-center '>
      {!isFirstPage ? (
        <Button
          className='bg-white h-7 w-7 text-black hover:bg-black hover:text-white border py-0.5 shadow-sm cursor-pointer px-2'
          onClick={() => {
            const prevPage = page - 1
            let queryParams = new URLSearchParams(window.location.search)
            queryParams = getQueryParams(queryParams, 'page', prevPage)
            const path = window.location.pathname + '?' + queryParams.toString()
            setPage(prevPage)
            router.push(path, {
              scroll: false
            })
          }}
        >
          <ArrowLeft size={12} />
        </Button>
      ) : (
        <Button className='bg-white h-7 w-7 text-black hover:bg-black hover:text-white px-2 border py-0.5 shadow-sm cursor-not-allowed'>
          <ArrowLeft size={12} />
        </Button>
      )}

      {renderPagination()}

      {!isLastPage ? (
        <Button
          size='sm'
          className='bg-white h-7 w-7 text-black hover:bg-black px-2 hover:text-white  rounded  border shadow-sm cursor-pointer'
          onClick={() => {
            const nextPage = page + 1
            let queryParams = new URLSearchParams(window.location.search)
            queryParams = getQueryParams(queryParams, 'page', nextPage)
            const path = window.location.pathname + '?' + queryParams.toString()
            setPage(nextPage)
            router.push(path, {
              scroll: false
            })
          }}
        >
          <ArrowRight size={12} />
        </Button>
      ) : (
        <Button className='bg-white h-7 w-7 text-black hover:bg-black hover:text-white px-2 rounded  border py-0.5 shadow-sm cursor-not-allowed'>
          <ArrowRight size={12} />
        </Button>
      )}
    </div>
  )
}
