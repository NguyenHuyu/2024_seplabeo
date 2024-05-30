import '../globals.css'
import { Locale } from '@/i18n.config'
import Header from '@/components/Layouts/header'
import Footer from '@/components/Layouts/footer'
import { getSession } from '@/hooks/getSession'

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: {
    language: Locale
  }
}) {
  const session = await getSession()
  return (
    <main className='h-full overflow-hidden mx-auto'>
      <div className='fixed top-0 left-0 z-50 w-full'>
        <Header params={params} session={session} />
      </div>
      <div className='lg:h-[100%] lg:min-h-[80vh] mt-14 md:mt-20'>{children}</div>
      <div className='z-50 w-full'>
        <Footer params={params} />
      </div>
    </main>
  )
}
