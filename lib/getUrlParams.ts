import { notFound } from 'next/navigation'

/**
 * Get url params
 * @param params
 * @returns {string}
 */

export const getUrlParams = (params: string): string => {
  try {
    const paramsID = params.split('__')[1]
    return paramsID.split('.')[0]
  } catch (error) {
    return notFound()
  }
}
