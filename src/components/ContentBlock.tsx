import React from 'react'
import Image from 'next/image'

interface ContentBlockProps {
  image: string
  imageAlt: string
  children: React.ReactNode
  reverse?: boolean
}

export default function ContentBlock({ image, imageAlt, children, reverse = false }: ContentBlockProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
      <div className={reverse ? 'order-2 lg:order-1' : ''}>
        {children}
      </div>
      <div className={reverse ? 'order-1 lg:order-2' : '' + ' relative rounded-xl overflow-hidden aspect-[4/3]'}>
        <Image src={image} alt={imageAlt} fill className='object-cover' />
      </div>
    </div>
  )
}