/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { TicketNFTAbi } from "@/lib/TicketNFT";
import { parseEther } from "viem";

import { useEffect, useState } from "react";
import { wGetOneConcertInfo } from "@/app/web3Functions";

export default function Detail({ params }) {
  const { address } = useAccount();
  const [data, setData] = useState("");

  const getConcertInfo = async () => {
    await wGetOneConcertInfo(params.idx).then((event) => {
      setData(event);
    });
  };

  const buyTicket = async () => {
    await writeContract({
      address: params.idx,
      abi: TicketNFTAbi,
      functionName: "sellTicket",
      args: [address],
      value: parseEther((data.price / 1000).toString()).toString(),
    })
      .then(() => {
        alert(`successfully mint and transfer ticket NFT!`);
      })
      .catch((res) => {
        console.log(res);
        alert(res);
      });
  };

  useEffect(() => {
    getConcertInfo();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-row w-full h-full">
          <div style={{ width: "35vw", height: "55vh" }}>
            <img
              src={data.image}
              alt="poster"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col ml-10 mt-5 w-full justify-around">
            <p className="text-2xl mb-10 font-bold">{data.name}</p>
            <ul>
              <li className="flex flex-row font-bold text-base mb-3">
                Category :&nbsp;<p className="font-medium">{data.category}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-3">
                Date/Time :&nbsp;
                <p className="font-medium">
                  {data.date} {data.time}
                </p>
              </li>
              <li className="flex flex-row font-bold text-base mb-3">
                Venue :&nbsp;<p className="font-medium">{data.venue}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-3">
                Remaining Tickets :&nbsp;
                <p className="font-medium">
                  {data.maxTicketCount - data.soldCount}/{data.maxTicketCount}
                </p>
              </li>
              <li className="flex flex-row font-bold text-base mb-3">
                Price :&nbsp;
                <p className="font-medium">{data.price / 1000}eth</p>
              </li>
            </ul>
            <button
              onClick={buyTicket}
              className="text-white font-bold bg-main-purple hover:bg-dark-purple h-12 w-3/5 rounded-full mt-10 self-end flex flex-row items-center justify-center"
            >
              Buy ticket
              <ChevronRightIcon className="ml-2 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
