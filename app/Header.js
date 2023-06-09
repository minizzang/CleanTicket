import { useRouter } from "next/navigation";
import Image from "next/image";
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
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="flex text-base font-medium">
        <button
          onClick={() => {
            router.push("/about");
          }}
          className="mr-8"
        >
          About
        </button>
        <button
          onClick={() => {
            router.push("/register");
          }}
          className="mr-8"
        >
          Register
        </button>
        <button
          onClick={() => {
            router.push("/mypage");
          }}
          className="mr-8"
        >
          MyPage
        </button>
      </div>
      <Web3Button />
    </div>
  );
}
