"use client"
import React, {useState} from "react";
import { IoSettings } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/userStore";
import { updateInfo } from "@/server/user";
import {toast} from "sonner"

export default function UpdateInfo() {
  const info =useUserStore((state) => state.info)
  const [loading,setLoading] = useState(false)
  const [input, setInput] = useState({
    name: info.name,
    link: info.link,
  });

  const setInfo = useUserStore(state => state.setInfo)

  const handleUpdate = async () => {
    setLoading(true)
    if(input.name==="" && input.link === ""){
      toast("Nhập thiếu thông tin!")
      setLoading(false)
    }
    else {
      const { status, data } = await updateInfo(input);
      if (status === 200) {
        toast("Lưu thông tin thành công!");
        setInfo(data[0])
        setLoading(false)
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex mb-4 justify-between items-center group cursor-pointer">
          <h1 className="font-bold uppercase">Cài đặt thông tin</h1>
          <IoSettings className="w-6 h-6 cursor-pointer group-hover:animate-spin duration-1000" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thông tin hiển thị</DialogTitle>
          <DialogDescription>
            Thực hiện thay đổi cho hồ sơ của bạn ở đây. Nhấp vào lưu khi bạn
            hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-right font-bold text-xs text-red-500">Tên tối đa 15 kí tự</p>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên blog
            </Label>
            <Input maxlength="15" id="name" value={input.name}  onChange={(e) => setInput({...input, name: e.target.value})} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Liên kết đến bạn
            </Label>
            <Input
              id="username"
              value={input.link}
              onChange={(e) => setInput({...input, link: e.target.value})}
              type="link"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading}  onClick={handleUpdate} type="submit">{loading ? "Đang lưu" : "Lưu lại"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
