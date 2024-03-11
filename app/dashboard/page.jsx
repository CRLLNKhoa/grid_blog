/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import GotoLink from "./components/gotoLink";
import Listpost from "./components/listpost";
import AddBlog from "./components/addblog";
import { getInfo, getUser } from "@/server/user";
import { useUserStore } from "@/stores/userStore";
import Loading from "./components/loading";
import SetInfo from "./components/setInfo";
import { getBlogs, getDashBoard } from "@/server/blog";
import { useBlogStore } from "@/stores/blogStore";
import UpdateInfo from "./components/updateInfo";

export default function Page() {
  const setUid = useUserStore((state) => state.setUid);
  const setList = useBlogStore((state) => state.setList);
  const info = useUserStore((state) => state.info);
  const setInfo = useUserStore((state) => state.setInfo);
  const uid = useUserStore((state) => state.uid);
  const setDashboard = useUserStore((state) => state.setDashboard);

  useEffect(() => {
    async function get() {
      const q = await getUser();
      setUid(q);
    }
    async function getList() {
      const q = await getBlogs();
      setList(q);
    }
    async function getDB() {
      const q = await getDashBoard();
      setDashboard(q);
    }
    async function getInfoStore() {
      const q = await getInfo();
      setInfo(q.data[0]);
    }
    get();
    getList();
    getDB();
    getInfoStore()
  }, []);
  if (!uid && !info) {
    return <Loading />;
  }
  return (
    <main className="flex flex-col h-screen w-full">
      <div className="container max-w-screen-lg min-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-3 flex-1 relative gap-4 bg-white p-4 rounded-md">
          <div className="col-span-3  lg:col-span-1 flex flex-col lg:border-r border-double lg:pr-4 mb-4 lg:mb-0">
           <div className="sticky top-4">
              <h1 className="font-bold uppercase">Thống kê</h1>
              <Dashboard />
              {!info &&  <SetInfo />}
              {info &&  <UpdateInfo />}
              <h1 className="font-bold uppercase line-clamp-1">
                Liên kết đến trang của bạn
              </h1>
              <GotoLink id={uid} />
           </div>
          </div>
          <div className="col-span-3 lg:col-span-2 overflow-y-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold uppercase">Danh sách bài viết</h1>
              <AddBlog />
            </div>
            <div className="flex-1 overflow-y-auto">
              <Listpost />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
