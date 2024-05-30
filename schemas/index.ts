import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  imageUrl: z.string(),
  qrCode: z.string(),
  picture: z.string()
})
