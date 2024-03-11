import Sidebar from "./components/sidebar";
import React from "react";
import SidebarMb from "./components/sidebarmb";
import { getInfoBlog } from "@/server/user";

export async function generateMetadata({ params: { id } }) {
  const data = await getInfoBlog(id)
  console.log(data,id)
  return {
    title: `Trang của ${data?.name}` || "Grid Blog",
    openGraph: {
      images: ["/Grid.png"],
    },
  };
}

export default function Layout({ children, params: { id } }) {
  return (
    <>
      <main className="grid grid-cols-12 font-mono h-screen">
        <div className="col-span-12 lg:hidden">
          <SidebarMb id={id} />
        </div>
        <div className="col-span-12 px-2 lg:col-span-6 lg:col-start-3  lg:col-end-9 overflow-y-auto">
          {children}
        </div>
        <div className="hidden lg:block col-span-2 ">
          <Sidebar id={id} />
        </div>
      </main>
    </>
  );
}
