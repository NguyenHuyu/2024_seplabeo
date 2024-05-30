'use server'
import { cookies } from 'next/headers'

export async function logout() {
  //delete the session cookie
  cookies().delete('session_token')
}
