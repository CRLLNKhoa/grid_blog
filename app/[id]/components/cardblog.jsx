import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDistance, subDays } from "date-fns";
import viLocale from "date-fns/locale/vi";

export default function Cardblog({data}) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col">
      <Link href={`${pathname.slice(0,7)}/post/${data?.id}`}>
        <span className="font-bold inline-block text-lg underline hover:no-underline 
        uppercase hover:text-white hover:bg-[#2E405B] underline-offset-2">
          {data?.title}
        </span>
      </Link>
      <div className="flex gap-4 items-center">
        <p className="text-muted-foreground">Đăng {formatDistance(subDays(data?.created_at, 3), new Date(), {
          addSuffix: true,
          locale: viLocale,
        })}</p>
        <Link href={""}>
          <span className="font-bold flex  items-center text-xs underline hover:no-underline
           hover:text-white hover:bg-[#2E405B] underline-offset-2">
            #{data?.tag}
          </span>
        </Link>
      </div>
      <p className="line-clamp-3 mt-2">
        {data?.content}
      </p>
    </div>
  );
}
