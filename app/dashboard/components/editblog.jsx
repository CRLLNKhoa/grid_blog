import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PiCursorClickBold } from "react-icons/pi";
import { updateBlogs } from "@/server/blog";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { useBlogStore } from "@/stores/blogStore";
import { MdModeEditOutline } from "react-icons/md";

export default function EditBlog({id, title,view, like,content,tag}) {
  const uid = useUserStore((state)=> state.uid)
  const setList = useBlogStore((state)=> state.setList)
  const list = useBlogStore((state)=> state.list)
  const [dataAdd, setDataAdd] = useState({
    content: content,
    title: title,
    tag: tag,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async () => {
    setIsLoading(true);
    try {
      if (
        dataAdd.content !== "" &&
        dataAdd.title !== "" &&
        dataAdd.tag !== ""
      ) {
        const { status, data } = await updateBlogs(id,dataAdd);
        if (status === 200) {
          const newList = list.filter(item => item.id !== id)
          const updateList = [data[0],...newList]
          setList(updateList)
          toast( "Đã cập nhật thành công bài viết!",{description: `Bài viết: ${data[0].title} đã được lưu.`});
        } else toast("Tạo bài viết không thành công!");
      } else toast("Bạn chưa nhập đủ thông tin.");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <button className="bg-orange-500 h-6 w-6 flex items-center justify-center rounded-md text-white active:scale-125 duration-500">
          <MdModeEditOutline className="w-4 h-4" />
        </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col">
            <div className="flex gap-4 font-bold mb-4 text-sm">
              <h1>Lượt xem: {view}</h1>
              <h1>Lượt thích: {like}</h1>
            </div>
            <h1 className="font-bold text-sm">1. Tiêu đề bài viết</h1>
            <Input
              value={dataAdd.title}
              onChange={(e) =>
                setDataAdd({ ...dataAdd, title: e.target.value })
              }
              type="text"
              placeholder="Tiêu đề..."
            />
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">2. Danh mục</h1>
                <Input
                  value={dataAdd.tag}
                  onChange={(e) =>
                    setDataAdd({ ...dataAdd, tag: e.target.value })
                  }
                  type="text"
                  placeholder="Tiêu đề..."
                />
              </div>
              <div className="flex items-end ml-auto font-bold text-xs text-red-500 uppercase animate-pulse">
                <a
                  className="flex items-center gap-1"
                  href="https://stackedit.io/app#"
                  target="_blank"
                >
                  Bạn không biết markdown <PiCursorClickBold />
                </a>
              </div>
            </div>
            <h1 className="font-bold text-sm mt-4">3. Nội dung</h1>
            <Textarea
              value={dataAdd.content}
              onChange={(e) =>
                setDataAdd({ ...dataAdd, content: e.target.value })
              }
              placeholder="Nhập nội dung bài viết bạn ở đây bằng Markdown."
            />
            <div className="flex my-4 gap-4 ml-auto">
              <AlertDialogCancel>Trở về</AlertDialogCancel>
              <Button disabled={isLoading} onClick={handleAdd}>
                {!isLoading ? "Cập nhật" : "Đang cập nhật..."}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
