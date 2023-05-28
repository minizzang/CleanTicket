"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Web3Button } from "@web3modal/react";

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
        <div onClick={() => router.push("/about")} className="cursor-pointer">
          <p className="mr-8">About</p>
        </div>
        <div
          onClick={() => router.push("/register")}
          className="cursor-pointer"
        >
          <p className="mr-8">Register</p>
        </div>
        <div onClick={() => router.push("/mypage")} className="cursor-pointer">
          <p className="mr-8">MyPage</p>
        </div>
      </div>
      <Web3Button />
    </div>
  );
}
