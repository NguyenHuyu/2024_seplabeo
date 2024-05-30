'use client'
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import ToolbarTiptap from '@/components/tiptap/toolbar-tiptap'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Typography from '@tiptap/extension-typography'
import { HardBreak } from '@tiptap/extension-hard-break'
import TextAlign from '@tiptap/extension-text-align'
import { cn } from '@/lib/utils'

export default function MainTiptap({
  editorState,
  setEditorState,
  setFormvalues,
  isEdit
}: any) {
  const editor = useEditor({
    editable: isEdit,
    content: editorState,
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextStyle,
      Color,
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: 'w-full h-auto'
        }
      }),
      HardBreak,
      Dropcursor,
      Typography.configure({
        oneHalf: false,
        oneQuarter: false,
        threeQuarters: false
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    onUpdate: ({ editor }) => {
      setFormvalues('content', editor.getHTML())
      setEditorState(editor.getHTML())
    }
  })

  return (
    <div className='py-6'>
      <div className='flex'>{isEdit && editor && <ToolbarTiptap editor={editor} />}</div>
      <div
        className={cn(
          'prose prose-2xl w-full mt-4',
          isEdit && ' border rounded-lg bg-slate-50'
        )}
      >
        <div className='flex flex-col gap-2'>
          <EditorContent className={cn('p-1', isEdit && 'bg-slate-50')} editor={editor} />
        </div>
      </div>
    </div>
  )
}
