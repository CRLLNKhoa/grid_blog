/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col h-screen justify-between p-4">
      <div className="flex justify-center items-center flex-1 flex-col">
        <h1 className="font-bold text-3xl uppercase mb-2 font-mono text-center">Chào mừng bạn đến với Grid Blog🌟</h1>
        <p className="text-center lg:w-2/3">🌐Chào mừng đến với không gian chia sẻ và khám phá🔍, nơi mà chúng ta cùng nhau đàm phán về những điều tuyệt vời của cuộc sống🌈. Tại Grid Blog, chúng tôi không chỉ đơn giản là một nơi để đọc bài viết 📖 - đây là một cộng đồng, là nơi mà mỗi câu chuyện được tạo nên để kết nối 🤝 và tạo ra ý nghĩa.</p>
        <Link href="/dashboard" className="mt-4 text-sky-600 animate-pulse font-bold text-lg duration-1000">🚀Hãy Bắt Đầu Ngay!</Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sm text-muted-foreground hidden lg:block">@Code by <a className="text-sky-600" target="_blank" href="https://luongkhoa.io.vn/">Carolo Khoa</a></h1>
        <div className="flex gap-4 items-center flex-wrap justify-around">
          <img
            className="h-4"
            src="/next.png"
            alt="ss"
          />
          <img
            className="h-4"
            src="/shadcn.png"
            alt="ss"
          />
          <img
            className="h-5"
            src="/supabase.png"
            alt="ss"
          />
          <img
            className="h-4"
            src="/tailwind.png"
            alt="ss"
          />
          <img
            className="h-4"
            src="/clerk.png"
            alt="ss"
          />
        </div>
      </div>
    </main>
  );
}
