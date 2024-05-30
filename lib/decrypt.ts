import 'server-only'
import { jwtVerify } from 'jose'

const secretKey = process.env.AUTH_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export default async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    return null
  }
}
