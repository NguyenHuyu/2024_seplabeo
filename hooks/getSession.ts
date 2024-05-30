import decrypt from '@/lib/decrypt'
import { cookies } from 'next/headers'

export async function getSession() {
  const session = cookies().get('session_token')?.value
  if (!session) return null
  return await decrypt(session)
}
