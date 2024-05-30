'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  isPending: boolean
  staticButton?: string
}

export default function LoadingButton({ isPending, staticButton }: Props) {
  return (
    <div className='flex justify-center p-4'>
      {isPending ? (
        <Button disabled={isPending} type='submit' className='w-[5.5rem]'>
          <svg
            className='w-6 h-6 animate-spin text-white'
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clip-rule='evenodd'
              d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
              fill='currentColor'
              fill-rule='evenodd'
            />
          </svg>
        </Button>
      ) : (
        <Button disabled={isPending} type='submit' className='hover:bg-black/80'>
          {staticButton}
        </Button>
      )}
    </div>
  )
}
