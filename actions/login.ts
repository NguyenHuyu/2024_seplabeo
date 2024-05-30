'use server'
import encrypt from '@/lib/encrypt'
import { LoginSchema } from '@/schemas'
import { loginService } from '@/services/login.service'
import { cookies } from 'next/headers'
import * as z from 'zod'

export async function login(values: z.infer<typeof LoginSchema>) {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return {
      error: 'Invalid fields'
    }
  }
  const { password, username } = validateFields.data

  const user = await loginService({ username })

  if (!user) {
    return {
      error: 'Thông tin không chính xác!'
    }
  }

  if (user.password !== password) {
    return {
      status: 409,
      error: 'Thông tin không chính xác!'
    }
  }
  // Create the session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000)

  const session = await encrypt({
    user,
    expires
  })

  cookies().set('session_token', session, {
    expires,
    httpOnly: true
  })

  return {
    status: 200,
    success: 'Đăng nhập thành công'
  }
}
