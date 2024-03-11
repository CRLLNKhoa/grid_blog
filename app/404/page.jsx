"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
export default function Error() {
  const router = useRouter()
  return (
    <div className='h-screen w-full flex justify-center items-center flex-col'>
      <h1 className='text-xl font-bold'>Thông tìm thấy bài viết!</h1>
      <p>Bài viết không tồn tại hoặc do chủ bài viết đã xóa hoặc ẩn.</p>
      <Button onClick={() => router.back()} className="mt-4 w-56">Trở lại</Button>
    </div>
  )
}
