import { database } from '@/lib/database'

interface LoginServiceProps {
  username: string
}
export async function loginService({ username }: LoginServiceProps) {
  try {
    const user = await database.user.findUnique({
      where: {
        username
      }
    })
    return user
  } catch (error) {
    return null
  }
}
