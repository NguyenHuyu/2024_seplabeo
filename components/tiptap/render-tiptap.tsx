import React from 'react'
import MainTiptap from '@/components/tiptap/main-tiptap'
import { News } from '@prisma/client'

interface Props {
  news: News
}

export default function RenderTiptap({ news }: Props) {
  return <MainTiptap isEdit={false} editorState={news?.content} />
}
