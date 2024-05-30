import slugify from 'slugify'

/**
 * Optimize slugify
 * @param str
 * @returns {string}
 */
export const optimizeSlugify = (str: string): string => {
  return slugify(str, {
    locale: 'vi',
    lower: true
  })
}
