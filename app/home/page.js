"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import dummy from "../dummy.json";
import { useStateContext } from "./state-provider";
import { readContract } from "@wagmi/core";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "../../lib/TicketNFTFactory";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useStateContext();
  const data = dummy.data.filter((d) => d.category == category);

  // Get whole concert info
  const getConcertInfo = async () => {
    // if (!isConnected) return;
    const res = await readContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "getConcertInfo",
    });
    console.log("getConcertInfo", res);
  };

  useEffect(() => {
    getConcertInfo();
  });

  return (
    <div className="grid grid-cols-3 h-full ">
      {data.map((data) => (
        <div
          onClick={() => router.push(`/home/detail/${data.id}`)}
          key={data.id}
          className="flex flex-col items-center overflow-hidden bg-gray-50 rounded-xl m-5 p-3 mt-0 drop-shadow-md hover:-translate-y-1 hover:scale-105 transition cursor-pointer"
        >
          <div className="relative w-48 h-64">
            <Image
              src={data.file}
              alt="thumbnail"
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>

          <p className="text-sm font-regular mt-3 w-full text-center">
            {data.name}
          </p>
          <p className="text-xs font-light mt-1">{data.period}</p>
        </div>
      ))}
    </div>
  );
}
