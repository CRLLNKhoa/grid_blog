/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import { getInfoBlog, getUserInfo } from "@/server/user";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarMb({ id }) {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    async function get() {
      const q = await getInfoBlog(id);
      setData(q);
    }
    get();
  }, []);
  return (
    <div className="flex flex-col pt-2 justify-center h-full border-b-2 border-muted-foreground border-dashed pb-6">
      <div
        className="border-b border-black flex flex-col w-[180px] pt-4 select-none mx-auto justify-center items-center
       pb-2 mb-2 cursor-pointer hover:bg-[#2E405B] hover:border-[#2E405B] duration-1000 hover:text-white"
      >
        <h2>Grid Blog v0.1</h2>
        {data ? (
          <b className="text-lg">{data?.name}</b>
        ) : (
          <Skeleton className={"h-4"} />
        )}
      </div>

      <div className="flex  justify-center items-start gap-1 w-full">
        <Link
          href={""}
          className="font-bold flex gap-2 relative hover:text-white group px-1 duration-500 hover:bg-[#2E405B] underline-offset-2"
        >
          <p className="underline group-hover:no-underline">Posts</p>{" "}
          <p className="text-red-500 no-underline">[{data?.posts}]</p>
        </Link>
        <Link
          href={""}
          className="font-bold hover:text-white hover:no-underline underline px-1 duration-500 hover:bg-[#2E405B] underline-offset-2"
        >
          Archive
        </Link>
        <Link
          href={""}
          className="font-bold hover:text-white flex group gap-2 px-1 duration-500 hover:bg-[#2E405B] underline-offset-2"
        >
          <p className="underline group-hover:no-underline">Categories</p>{" "}
          <p className="text-red-500 no-underline">[{data?.tag}]</p>
        </Link>
        <a
          target="_blank"
          href={data?.link}
          className="font-bold hover:text-white hover:no-underline underline px-1 duration-500 hover:bg-[#2E405B] underline-offset-2"
        >
          About
        </a>
        {/* <div className="flex justify-start w-full gap-2">
          <a
            href="https://github.com/CRLLNKhoa"
            target="_blank"
          >
            <UseAnimations
              animation={github}
              size={22}
              loop={true}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://www.facebook.com/lnkhoa1205/"
            target="_blank"
          >
            <UseAnimations
              animation={facebook}
              size={22}
              loop={true}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://www.facebook.com/lnkhoa1205/"
            target="_blank"
          >
            <UseAnimations
              animation={twitter}
              autoPlay={true}
              loop={true}
              size={22}
              className="cursor-pointer"
            />
          </a>
        </div> */}
      </div>
      <div className="flex gap-2 justify-center items-center w-full text-xs">
        <p>@2024</p>
        <a
          href="https://luongkhoa.io.vn/"
          target="_blank"
          className="font-bold hover:text-white hover:no-underline underline px-1 duration-500 hover:bg-[#2E405B] underline-offset-2"
        >
          Carolo Khoa
        </a>
      </div>
    </div>
  );
}
