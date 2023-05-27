"use client";

import { usePathname, useRouter } from "next/navigation";
import { useStateContext } from "./state-provider";

export default function HeaderCategory() {
  const [category, setCategory] = useStateContext();
  const pathname = usePathname();
  const router = useRouter();

  // detail page에서 category click하면 home으로 routing
  function routeHome() {
    if (pathname != "/home") {
      router.push("/home");
    }
  }

  return (
    <div className="flex flex-row justify-center font-medium text-lg mb-10 bg-main-purple text-white w-full">
      <p
        onClick={() => {
          setCategory("musical");
          routeHome();
        }}
        className={[
          `flex justify-center w-1/7 w-[13%] h-full p-3 cursor-pointer hover:border-t-light-purple hover:border-t-[6px] ${
            category == "musical" ? " border-t-light-purple border-t-[6px]" : ""
          }`,
        ]}
      >
        Musical
      </p>
      <p
        onClick={() => {
          setCategory("concert");
          routeHome();
        }}
        className={[
          `flex justify-center w-1/7 w-[13%] h-full p-3 cursor-pointer hover:border-t-light-purple hover:border-t-[6px] ${
            category == "concert" ? " border-t-light-purple border-t-[6px]" : ""
          }`,
        ]}
      >
        Concert
      </p>
      <p
        onClick={() => {
          setCategory("play");
          routeHome();
        }}
        className={[
          `flex justify-center w-1/7 w-[13%] h-full p-3 cursor-pointer hover:border-t-light-purple hover:border-t-[6px] ${
            category == "play" ? " border-t-light-purple border-t-[6px]" : ""
          }`,
        ]}
      >
        Play
      </p>
      <p
        onClick={() => {
          setCategory("sports");
          routeHome();
        }}
        className={[
          `flex justify-center w-1/7 w-[13%] h-full p-3 cursor-pointer hover:border-t-light-purple hover:border-t-[6px] ${
            category == "sports" ? " border-t-light-purple border-t-[6px]" : ""
          }`,
        ]}
      >
        Sports
      </p>
      <p
        onClick={() => {
          setCategory("exhibitions");
          routeHome();
        }}
        className={[
          `flex justify-center w-1/7 w-[13%] h-full p-3 cursor-pointer hover:border-t-light-purple hover:border-t-[6px] ${
            category == "exhibitions"
              ? " border-t-light-purple border-t-[6px]"
              : ""
          }`,
        ]}
      >
        Exhibitions
      </p>
    </div>
  );
}
