"use client";
import Link from "next/link";
import React from "react";
import { GrFormNextLink } from "react-icons/gr";

export default function GotoLink({ id }) {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  return (
    <div className="flex gap-2 items-center mt-4">
     {id && <>
        <input
          value={`${origin}/${id}`}
          type="text"
          readOnly
          className="h-8 flex-1 text-sm font-bold py-1 border px-2 outline-none"
        />
  
        <Link
          href={`${origin}/${id}`}
          target="_blank"
          className="bg-sky-500 active:scale-105 active:bg-red-500
         w-8 flex items-center justify-center h-8 rounded-md text-white text-sm font-bold "
        >
          <GrFormNextLink className="h-6 w-6" />
        </Link>
     </>}
    </div>
  );
}
