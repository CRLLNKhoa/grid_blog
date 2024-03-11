"use client";
import React, { useState } from "react";
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
import { MdAddCircle } from "react-icons/md";
import { addInfo } from "@/server/user";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";

export default function SetInfo() {
  const [loading,setLoading] = useState(false)
  const [dataAdd, setDataAdd] = useState({
    name: "",
    link: "",
  });
  const setInfo = useUserStore(state => state.setInfo)

  const handleAdd = async () => {
    setLoading(true)
    if(dataAdd.name==="" && dataAdd.link === ""){
      toast("Nhập thiếu thông tin!")
      setLoading(false)
    }
    else {
      const { status, data } = await addInfo({
        name: dataAdd.name,
        link: dataAdd.link,
      });
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
        <div className="flex mb-4 justify-between items-center group cursor-pointer text-red-500 animate-pulse">
          <h1 className="font-bold uppercase">Cài đặt thông tin</h1>
          <MdAddCircle className="w-6 h-6 cursor-pointer group-hover:animate-spin duration-1000" />
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
            <Input id="name" maxlength="15" value={dataAdd.name} onChange={(e) => setDataAdd({...dataAdd, name: e.target.value})} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Liên kết
            </Label>
            <Input
              id="username"
              value={dataAdd.link} onChange={(e) => setDataAdd({...dataAdd, link: e.target.value})}
              type="link"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading}  onClick={handleAdd} type="submit">{loading ? "Đang lưu" : "Lưu lại"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
