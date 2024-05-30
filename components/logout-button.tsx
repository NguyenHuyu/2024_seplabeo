'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { logout } from '@/actions/logout'

export default function LogoutButton() {
  return (
    <Button variant='outline' onClick={() => logout()} className='w-full'>
      Đăng xuất
    </Button>
  )
}
