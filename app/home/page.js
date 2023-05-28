/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useStateContext } from "./state-provider";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { wGetAllConcertInfo } from "../web3Functions";
import WalletConnectInfo from "../WalletConnectInfo";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [connected, setConnected] = useState(null);
  const [category, setCategory] = useStateContext();
  const [eventList, setEventList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get whole concert info
  const getConcertInfo = async () => {
    setIsLoaded(false);
    await wGetAllConcertInfo().then(async (res) => {
      const filtered = res.filter((d) => d.category == category);
      setEventList(filtered);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    setEventList([]);
    getConcertInfo();
  }, [category]);

  if (connected == false) return <WalletConnectInfo/>;
  else if (connected == true)
    return isLoaded && eventList.length == 0 ? (
      <p className="text-gray-300 font-black text-2xl py-20 text-center w-full">
        There are no {category} on sale
      </p>
    ) : (
      <div className="grid grid-cols-3 h-full ">
        {eventList.map((data) => (
          <div
            key={data.addr}
            onClick={() => {
              if (data.soldCount < data.maxTicketCount) {
                router.push(`/home/detail/${data.addr}`);
              }
            }}
            className="flex flex-col items-center overflow-hidden bg-gray-50 rounded-xl m-5  mt-0 drop-shadow-md hover:-translate-y-1 hover:scale-105 transition cursor-pointer"
          >
            <div className="relative w-48 h-64 grid mt-3">
              <img
                src={data.image}
                alt="thumbnail"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <p className="text-sm font-regular mt-3 w-full text-center">
              {data.name}
            </p>
            <p className="text-xs font-light mt-1 mb-3">{data.date}</p>
            {data.soldCount == data.maxTicketCount ? (
              <div className="flex absolute bg-gray-200 opacity-60 w-full h-full items-center justify-center">
                <img src="/soldout.png" alt="soldout" />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    );
}
