import React from 'react'
import { Metadata } from 'next'
import { getDetailBlog } from '@/server/blog';

export async function generateMetadata({ params: { slug } }) {
    const {status,data} = await getDetailBlog(slug)
    return {
      title: data[0]?.title || "Grid Blog",
      openGraph: {
        images: ["/Grid.png"],
      },
      description: data[0]?.content || "Nhấn vào để xem chi tiết!",
    };
  }

export default function layout({children, params: { slug } }) {
  return (
    <>{children}</>
  )
}
