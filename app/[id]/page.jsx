/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Cardblog from "./components/cardblog";
import { getBlogsPage } from "@/server/blog";
import Loading from "../dashboard/components/loading";
import { RxValueNone } from "react-icons/rx";

export default function Page({ params: { id } }) {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    async function get() {
      const q = await getBlogsPage(id);
      setData(q);
    }
    get();
  }, []);
  if (!data) {
    return <Loading />;
  }
  return (
    <main className="flex flex-col h-full pt-4 content-show gap-6">
      {data && data?.map((item) => <Cardblog key={item.id} data={item} />)}
      {data?.length === 0 && (
        <div className="flex flex-col justify-center items-center py-12">
          <RxValueNone className="w-12 h-12" />
          <p>Chưa có bài đăng nào.</p>
        </div>
      )}
      <div className="py-8 flex items-center">
        <p>Page 1/1</p>
        {/* <p className="mx-auto cursor-pointer px-2 uppercase text-center  underline hover:no-underline hover:text-white hover:bg-[#2E405B] underline-offset-2">
          See more
        </p> */}
      </div>
    </main>
  );
}
