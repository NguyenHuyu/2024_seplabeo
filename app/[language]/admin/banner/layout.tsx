import { IProps } from '@/app/[language]/layout'

interface Props extends IProps {
  modal: React.ReactNode
}

export default function PhotosLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
