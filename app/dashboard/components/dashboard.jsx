import { useUserStore } from "@/stores/userStore";
import React from "react";

export default function Dashboard() {
  const dashboardData = useUserStore(state => state.dashboardData)
  console.log(dashboardData)
  return (
    <div className="flex flex-col gap-2 items-center justify-between my-4">
        <Item title="Bài viết" num={dashboardData?.countBlog}/>
        <Item title="Lượt xem" num={dashboardData?.view} color="bg-green-500" />
        <Item title="Lượt thích" num={dashboardData?.like} color="bg-pink-500" />
        <Item title="Bình luận" num={dashboardData?.countCmt} color="bg-yellow-500" />
    </div>
  );
}

function Item({color="bg-sky-500",title,num}) {
  return (
    <div className="flex items-center gap-2 border-b w-full pb-2">
      <div className={`w-2 h-2 ${color} rounded-full`}></div>
      <h2 className="text-sm font-bold">{title}:</h2>
      <p className="text-sm font-semibold">{num}</p>
    </div>
  );
}
