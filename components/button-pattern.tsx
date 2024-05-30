import React from 'react'
import { FileSpreadsheet, PlusCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'

export interface IListButton {
  name: string
  url: string
  file: boolean
}
interface ButtonPatternProps {
  listButton: IListButton[]
}

export default function ButtonPattern({ listButton }: ButtonPatternProps) {
  return (
    <div className='flex items-center gap-2'>
      {listButton.map((item) => (
        <Link href={item.url} key={item.url}>
          <Button
            key={item.url}
            size='sm'
            variant={item.file ? 'outline' : 'default'}
            className='h-7 gap-1 hover:shadow-md hover:scale-95 duration-300 transition-all'
          >
            {item.file ? (
              <FileSpreadsheet className='h-3.5 w-3.5 hover:animate-spin duration-200' />
            ) : (
              <PlusCircleIcon className='h-3.5 w-3.5 hover:animate-spin duration-200' />
            )}
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              {item.name}
            </span>
          </Button>
        </Link>
      ))}
    </div>
  )
}
