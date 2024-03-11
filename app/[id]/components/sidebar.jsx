/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getInfoBlog, getUserInfo } from "@/server/user";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Sidebar({ id }) {
  const [data, setData] = useState(undefined);
  const pathname = usePathname()
  useEffect(() => {
    async function get() {
      const q = await getInfoBlog(id);
      setData(q);
    }
    get();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: "100%", y: 0 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
        className="flex animate-in flex-col pt-12 pb-2 items-end justify-between h-full"
      >
        <div
          className="border-b border-black flex flex-col rotate-90 w-[180px] translate-y-3 -translate-x-[92px] pt-4 select-none
       pb-4 cursor-pointer hover:bg-[#2E405B] hover:border-[#2E405B] duration-1000 hover:pl-4 hover:text-white"
        >
          <h2>Grid Blog v0.1</h2>
          {data ? (
            <b className="text-lg">{data?.name}</b>
          ) : (
            <Skeleton className={"h-4"} />
          )}
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <Link
            href={pathname.slice(0,7)}
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
        <div className="flex gap-2 justify-start w-full text-xs">
          <p>@2024</p>
          <a
            href="https://luongkhoa.io.vn/"
            target="_blank"
            className="font-bold hover:text-white hover:no-underline underline px-1 duration-500 hover:bg-[#2E405B] underline-offset-2"
          >
            Carolo Khoa
          </a>
        </div>
      </motion.div>
    </>
  );
}
