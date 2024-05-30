import decrypt from '@/lib/decrypt'
import encrypt from '@/lib/encrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session_token')?.value

  if (!session) return
  // Refresh the session so it doesn't expire
  try {
    const parsed = await decrypt(session)

    parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000)

    const response = NextResponse.next()

    response.cookies.set({
      name: 'session_token',
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires
    })
    return response
  } catch (error) {
    request.cookies.delete('session_token')
  }
}
