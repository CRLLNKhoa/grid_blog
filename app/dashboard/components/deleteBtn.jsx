import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { FaTrash } from 'react-icons/fa'
import { deleteBlogs } from '@/server/blog'
import { toast } from "sonner";
import { useBlogStore } from '@/stores/blogStore';

export default function DeleteBtn({id}) {
    const setList = useBlogStore((state) => state.setList);
    const list = useBlogStore((state) => state.list);
    const handleDelete = async (id) => {
         const {status,message} = await deleteBlogs(id)
         if(status === 200){
            toast(message)
           const newList = list.filter(item => item.id !== id)
           setList(newList)
         }
    }
  return (
      <AlertDialog>
      <AlertDialogTrigger asChild>
      <button className="bg-red-500 h-6 w-6 flex items-center justify-center rounded-md text-white active:scale-125 duration-500">
          <FaTrash className="w-3 h-3" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể khôi phục, dữ liệu sẽ bị xóa khỏi cơ sở dữ liệu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Trở lại</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
