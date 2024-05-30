'use client'
import React from 'react'

export default function ListProduct({ data }: any) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-10'>
      {data.map((item: any) => (
        <div
          key={item._id}
          className='my-2 border p-2 rounded-md shadow-md hover:bg-slate-200 cursor-pointer'
        >
          <div className='flex justify-center items-center gap-3'>
            <div className='flex flex-col justify-start items-center gap-3'>
              <h1 className='text-xl font-bold'>{item.name}</h1>
              <div className='text-md text-left'>
                {item.productions.map((i: any) => (
                  <li key={i.title} className='text-left'>
                    {i.title}
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
