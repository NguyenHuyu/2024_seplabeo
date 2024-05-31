import React from 'react'
import Modal from '@/components/modal'
import CardForm from '@/components/card-form'
import { IProps } from '@/app/[language]/layout'
import VideoForm from '../../../_components/video-form'

export default async function page({ params }: IProps) {
  return (
    <Modal classNames='top-28 sm:max-w-xl md:top-10 md:max-w-lg lg:max-w-xl xl:max-w-3xl 2xl:max-w-5xl'>
      <CardForm label={`Tạo mới video`}>
        <VideoForm />
      </CardForm>
    </Modal>
  )
}
