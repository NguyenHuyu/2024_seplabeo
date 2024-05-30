'use client'
import { Editor } from '@tiptap/react'
import React, { ChangeEvent } from 'react'
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo
} from 'lucide-react'

type Props = {
  editor: Editor
}

export default function ToolbarTiptap({ editor }: Props) {
  const addImage = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus()?.setImage({ src: url }).run()
    }
  }

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run()
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <button type='button' onClick={addImage}>
        ⬆️
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Bold className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Italic className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Strikethrough className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <Code className='w-6 h-6' />
      </button>
      {/* <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
            >
                <Heading1 className="w-6 h-6" />
            </button> */}

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <Heading3 className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <Heading4 className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <List className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        Left
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        Center
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        Right
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        Justify
      </button>
      <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>
        unsetTextAlign
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <ListOrdered className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <CodepenIcon className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <Quote className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className='w-6 h-6' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className='w-6 h-6' />
      </button>
      <input
        type='color'
        onInput={(event) => handleColorChange(event as any)}
        value={editor.getAttributes('textStyle').color}
        data-testid='setColor'
      />
      <button
        type='button'
        onClick={() => editor.chain().focus().setColor('#000000').run()}
        className={editor.isActive('textStyle', { color: '#000000' }) ? 'is-active' : ''}
        data-testid='setPurple'
      >
        Black
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setColor('#F98181').run()}
        className={editor.isActive('textStyle', { color: '#F98181' }) ? 'is-active' : ''}
        data-testid='setRed'
      >
        Red
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
        className={editor.isActive('textStyle', { color: '#FBBC88' }) ? 'is-active' : ''}
        data-testid='setOrange'
      >
        Orange
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setColor('#FAF594').run()}
        className={editor.isActive('textStyle', { color: '#FAF594' }) ? 'is-active' : ''}
        data-testid='setYellow'
      >
        Yellow
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
        className={editor.isActive('textStyle', { color: '#70CFF8' }) ? 'is-active' : ''}
        data-testid='setBlue'
      >
        Blue
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        Blockquote
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        Horizontal
      </button>
    </div>
  )
}
