import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://seplabeo.com/vi/dong-trung-ha-thao-quang-vy',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1
    },
    {
      url: 'https://seplabeo.com/en/dong-trung-ha-thao-quang-vy',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1
    },
    {
      url: 'https://seplabeo.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8
    },
    {
      url: 'https://seplabeo.com/vi',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8
    },
    {
      url: 'https://seplabeo.com/en',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8
    },
    {
      url: 'https://seplabeo.com/vi/cong-ty',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5
    },
    {
      url: 'https://seplabeo.com/en/cong-ty',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5
    }
  ]
}
