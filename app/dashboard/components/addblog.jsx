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
import { addBlog } from "@/server/blog";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { useBlogStore } from "@/stores/blogStore";

export default function AddBlog() {
  const uid = useUserStore((state)=> state.uid)
  const addList = useBlogStore((state)=> state.addList)
  const list = useBlogStore((state)=> state.list)
  const [dataAdd, setDataAdd] = useState({
    content: "",
    uid: "",
    title: "",
    tag: "",
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
        const { status, data } = await addBlog({...dataAdd,uid});
        if (status === 200) {
          addList(data[0])
          toast( "Đã tạo thành công bài viết!",{description: `Bài viết: ${data[0].title} đã được lưu.`});
          setDataAdd({
            content: "",
            uid: "",
            title: "",
            tag: "",
          });
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
          <button className="bg-sky-500 px-2 py-1 text-sm font-bold flex items-center justify-center rounded-md text-white active:scale-125 duration-500">
            <IoMdAdd className="w-5 h-5" /> Thêm bài mới
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col">
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
                {!isLoading ? "Thêm" : "Đang tạo..."}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
