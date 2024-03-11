import { updateStatusBlogs } from "@/server/blog";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";

export default function Showblog({ status, id,setIsLoading }) {
    const [checked,setChecked] = useState(status)
    const [loading,setLoading] = useState(false)
  const handleShow = async (id, dataUpdate) => {
    setLoading(true)
    const { status } = await updateStatusBlogs(id, dataUpdate);
    if (status === 200) {
      toast("Cập nhật thành công!");
      setLoading(false)
    }
  };
  return (
    <div className="flex">
      {checked && (
        <button disabled={loading}
          onClick={() => {handleShow(id, { status: false });setChecked(false)}}
          className="bg-green-500 h-6 w-6 flex items-center justify-center rounded-md text-white active:scale-125 duration-500"
        >
          <IoEye className="w-4 h-4" />
        </button>
      )}
      {!checked && <button disabled={loading}
             onClick={() => {handleShow(id, { status: true });setChecked(true)}}
        className="bg-blue-500 h-6 w-6 flex items-center justify-center rounded-md text-white active:scale-125 duration-500"
      >
        <IoEyeOff className="w-4 h-4" />
      </button>}
    </div>
  );
}
