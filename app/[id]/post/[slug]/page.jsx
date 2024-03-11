/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import { motion } from "framer-motion";
import { getBlogs, getDetailBlog, view } from "@/server/blog";
import { formatDistance, subDays } from "date-fns";
import viLocale from "date-fns/locale/vi";
import Loading from "@/app/dashboard/components/loading";
import { usePathname, useRouter } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";



export default function Page({ params: { slug } }) {
  const [blog, setBlog] = useState(undefined);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    async function getBlogs() {
      const q = await getDetailBlog(slug);
      if (q.status === 200 && q?.data?.length > 0) {
        setBlog(q.data[0]);
      } else router.push("/404");
    }
    async function viewblog() {
      const q = await view(slug);
    }
    getBlogs();
    viewblog();
  }, [slug]);

  if (!blog) {
    return <Loading />;
  }

  return (
    <>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5, x: "100%", y: 0 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
      >
        <main className="flex flex-col pt-4 pb-1 pr-4 h-full">
          <h1 className="font-bold text-xl underline underline-offset-2 cursor-pointer">
            {blog?.title}
          </h1>
          <p className="text-xs">
            Đăng{" "}
            {formatDistance(subDays(blog?.created_at, 3), new Date(), {
              addSuffix: true,
              locale: viLocale,
            })}
          </p>
          <Markdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            className="flex flex-col gap-2 pb-4 content mt-4"
          >
            {blog?.content}
          </Markdown>
          <div
            className="mt-auto cursor-pointer pb-8 underline underline-offset-2 text-sm font-bold flex group"
            onClick={() => router.push(`${pathName.slice(0, 7)}`)}
          >
            <UseAnimations
              className="rotate-90"
              animation={arrowDown}
              size={22}
            />
            <p className="group-hover:bg-[#2E405B] group-hover:text-white duration-500 px-2">
              Back to
            </p>
          </div>
        </main>
      </motion.div>
    </>
  );
}
