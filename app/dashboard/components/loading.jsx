"use client"
import React from 'react'
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2';

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
         <UseAnimations animation={loading2} size={56} />
         <h1 className='font-bold text-sm animate-pulse'>Đang lấy thông tin...</h1>
    </div>
  )
}
