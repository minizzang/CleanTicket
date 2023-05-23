"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  return (
    <div className="max-w-6xl w-full flex items-center p-8">
      <Image
        src="/logo.png"
        width={300}
        height={100}
        alt="clean ticket"
        className="mr-12 cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="flex text-base font-medium">
        <Link href="/about">
          <p className="mr-8">About</p>
        </Link>
        <Link href="/register">
          <p className="mr-8">Register</p>
        </Link>
        <Link href="/mypage">
          <p className="mr-8">MyPage</p>
        </Link>
      </div>
    </div>
  );
}
