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
import { useEffect, useState } from "react";
import { wGetAllConcertInfo } from "../web3Functions";

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useStateContext();
  const data = dummy.data.filter((d) => d.category == category);
  const [eventList, setEventList] = useState([]);

  // Get whole concert info
  const getConcertInfo = async () => {
    // if (!isConnected) return;
    await wGetAllConcertInfo().then(async (res) => setEventList(res));
  };

  useEffect(() => {
    setEventList([]);
    getConcertInfo();
  }, []);

  return (
    <div className="grid grid-cols-3 h-full ">
      {eventList.map((data) => (
        <div
          onClick={() => router.push(`/home/detail/${data.addr}`)}
          key={data.addr}
          className="flex flex-col items-center overflow-hidden bg-gray-50 rounded-xl m-5 p-3 mt-0 drop-shadow-md hover:-translate-y-1 hover:scale-105 transition cursor-pointer"
        >
          <div className="relative w-48 h-64">
            {/* <Image
              // src={data.image}
              src="https://dimg.donga.com/wps/NEWS/IMAGE/2019/12/31/99024137.2.jpg"
              alt="thumbnail"
              fill={true}
              style={{ objectFit: "cover" }}
            /> */}
            <img src="https://i.namu.wiki/i/slmFMXb1Fchs2zN0ZGOzqfuPDvhRS-H9eBp7Gp613-DNKi6i6Ct7eFkTUpauqv5HAYR97mrNqrvvcCDEyBdL_g.webp" />
          </div>

          <p className="text-sm font-regular mt-3 w-full text-center">
            {data.name}
          </p>
          <p className="text-xs font-light mt-1">{data.date}</p>
        </div>
      ))}
    </div>
  );
}
