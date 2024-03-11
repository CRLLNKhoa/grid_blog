"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

export default function CommentComponents() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-start font-bold underline underline-offset-2">
          Comments
        </h1>
        <div className="flex items-center gap-1 text-xs underline underline-offset-2 font-bold cursor-pointer
         hover:bg-[#2E405B] px-2 duration-1000 hover:text-white py-1 hover:no-underline">
          <IoMdAdd />
          Add comment
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <Comment />
      </div>
    </div>
  );
}

function Comment() {
  const [showFull, setShowFull] = useState();
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="flex gap-4 items-center">
        <h2 className="font-bold flex items-center gap-2">
          <FaCircleUser className="h-4 w-4" />
          Lương Khoa
        </h2>
        <p className="text-xs">_5m ago</p>
      </div>
      <p
        onClick={() => setShowFull(!showFull)}
        className={cn(
          "text-xs duration-500 transition-all",
          !showFull && "line-clamp-2"
        )}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae non
        laborum eius blanditiis, praesentium earum quia est iste quod
      </p>
    </div>
  );
}
