import 'server-only'
import { SignJWT, JWTPayload } from 'jose'

const secretKey = process.env.AUTH_SECRET_KEY

const key = new TextEncoder().encode(secretKey)

export default async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setIssuedAt()
    .setExpirationTime('7200 sec from now')
    .sign(key)
}
