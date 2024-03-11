"use client"
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
export default function Header() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-white mb-4">
      <h1 className="font-bold uppercase border-t border-b border-black cursor-pointer">
        GridBlog
      </h1>
       {isClient && <UserButton />}
    </div>
  );
}
