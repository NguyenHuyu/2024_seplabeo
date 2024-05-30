'use client'
import { Fragment, useEffect } from 'react'
import { usePopup } from '@/providers/use-popup'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface IModalProps {
  children: React.ReactNode
  classNames?: string
}

export default function Modal({ children, classNames }: IModalProps) {
  const router = useRouter()

  const { isOpen, inToggle } = usePopup()

  const handleClose = () => {
    router.back()
  }

  useEffect(() => {
    inToggle()
    if (!isOpen) {
      return router.back()
    }
  }, [inToggle, isOpen, router])

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-white/90 ' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={cn(
                  'relative transform overflow-hiddenbg-white text-left shadow-xl transition-all sm:my-8 sm:w-full',
                  classNames
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
