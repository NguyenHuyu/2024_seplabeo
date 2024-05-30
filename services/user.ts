'use server'
import { database } from '@/lib/database'

export const getUserByUsername = async (username: string) => {
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

export const createUser = async () => {
  try {
    await database.user.create({
      data: {
        password: 'passwo234234rd',
        username: 'userna23424234me',
        id: 'ema234234324il'
      }
    })
  } catch (error) {
    return null
  }
}
