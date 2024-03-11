"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";

export default function Listpost() {
  const list = useBlogStore((state) => state.list);

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex bg-muted border items-center p-2 rounded-md w-2/3">
          <IoSearch className="w-4 h-4 text-muted-foreground" />
          <input
            className="px-2 outline-none text-sm bg-transparent w-full"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="flex bg-muted border items-center p-2 rounded-md flex-1 text-sm justify-between cursor-pointer">
          <p>All tag</p>
          <FaCaretDown />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 h-full overflow-y-auto">
        {list?.length === 0 && (
          <h1 className="text-center font-bold py-12">Chưa có bài viết nào</h1>
        )}
        {list?.map((item) => (
          <CardBlog
            key={item?.id}
            content={item.content}
            id={item?.id}
            title={item?.title}
            tag={item.tag}
            like={item.like}
            view={item.view}
            created_at={item?.created_at}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}

import { useBlogStore } from "@/stores/blogStore";
import DeleteBtn from "./deleteBtn";
import { formatDistance, subDays } from "date-fns";
import viLocale from "date-fns/locale/vi";
import EditBlog from "./editblog";
import Showblog from "./showblog";

function CardBlog({ title, content, id, created_at, status, tag, like, view }) {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return (
      <div
        className="bg-sky-600/50 cursor-progress px-2 flex justify-center py-1 text-sm rounded-md text-white font-bold animate-pulse duration-1000"
      >
        Đang cập nhật ...
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center gap-2 border-b py-4 px-2">
      <h1 className="text-xs uppercase font-bold">#{id.slice(-4)}</h1>
      <h2
        title={"phụ"}
        className="leading-2 font-semibold cursor-pointer text-sm line-clamp-1 w-1/2"
      >
        {title}
      </h2>
      <p className="text-xs text-muted-foreground line-clamp-1 mr-auto">
        Viết{" "}
        {formatDistance(subDays(created_at, 3), new Date(), {
          addSuffix: true,
          locale: viLocale,
        })}
      </p>
      <div className="flex gap-2">
        <Showblog setIsLoading={setIsLoading} status={status} id={id} />
        <EditBlog
          id={id}
          content={content}
          title={title}
          tag={tag}
          like={like}
          view={view}
        />
        <DeleteBtn id={id} />
      </div>
    </div>
  );
}
