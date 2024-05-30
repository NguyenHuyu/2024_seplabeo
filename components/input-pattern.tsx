'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger
} from '@/components/ui/select'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { Filter, X } from 'lucide-react'

export interface IInputOption {
  value: string
  name: string
}

interface InputPatternProps {
  listSelectOptions: IInputOption[]
}

export default function InputPattern({ listSelectOptions }: InputPatternProps) {
  const initialRender = useRef(true)
  // Get value and filter from URL
  const valueParams = useSearchParams()?.get('value') as string
  const filterParams = useSearchParams()?.get('filter') as string
  // Input search
  const router = useRouter()
  const pathName = usePathname()

  const [text, setText] = useState<string | undefined>(valueParams || undefined)
  const [query] = useDebounce(text, 400)
  const [selectedOption, setSelectedOption] = useState<string>(
    valueParams || listSelectOptions[0]?.value
  )
  const [inputName, setInputName] = useState<string>(
    listSelectOptions[0]?.name || filterParams
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // if (isValidInput(value)) {
    //   setText(value)
    // }
    setText(value)
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    if (!query) {
      router.push(pathName)
    } else {
      router.push(`${pathName}?filter=${selectedOption}&value=${query}`)
    }
  }, [router, query, pathName, selectedOption])

  useEffect(() => {
    if (listSelectOptions) {
      listSelectOptions.find((option) => {
        if (option.value === selectedOption) {
          setInputName(option.name)
        }
      })
    }
  }, [valueParams, filterParams, listSelectOptions, selectedOption])

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col md:flex md:flex-row justify-between gap-3 items-center md:items-center'>
        <div className='relative'>
          <Input
            placeholder={inputName}
            value={text}
            onChange={handleChange}
            className='pl-10 pr-8 h-8 w-[150px] lg:w-[350px] border-black shadow-sm'
          />
          {text && (
            <X
              size={18}
              className='absolute top-2 right-2 cursor-pointer'
              onClick={() => {
                setText('')
                setSelectedOption(filterParams)
                router.push(pathName)
                router.refresh()
              }}
            />
          )}

          <div className='absolute top-0'>
            {listSelectOptions && (
              <Select
                defaultValue={selectedOption}
                onValueChange={(value) => {
                  setSelectedOption(value)
                }}
              >
                <SelectTrigger className='w-10 border-none hover:-translate-y-1 duration-300 transition-all'>
                  <Filter size={16} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tìm kiếm</SelectLabel>
                    {listSelectOptions.map((option) => (
                      <SelectItem
                        defaultValue={option.value[0]}
                        key={option.value}
                        value={option.value}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
