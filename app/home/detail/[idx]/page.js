"use client";

import Image from "next/image";
import dummy from "../../../dummy.json";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "../../../../lib/TicketNFTFactory";
import { TicketNFTAbi } from "@/lib/TicketNFT";
import { parseEther } from "viem";

import { useEffect, useState } from "react";
import { wGetOneConcertInfo } from "@/app/web3Functions";

export default function Detail({ params }) {
  const { address } = useAccount();
  // const data = dummy.data.find((d) => d.id == params.idx);
  const [data, setData] = useState("");

  const getConcertInfo = async () => {
    await wGetOneConcertInfo(params.idx).then((event) => {
      setData(event);
    });
  };

  const buyTicket = async () => {
    const res = await writeContract({
      address: params.idx,
      abi: TicketNFTAbi,
      functionName: "sellTicket",
      args: [address],
      value: parseEther(data.price / 1000).toString(),
    });
    alert(`successfully mint and transfer ticket NFT!`);
  };

  useEffect(() => {
    getConcertInfo();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-row">
          <Image
            src={data.file}
            width={250}
            height={450}
            alt="poster"
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-col ml-10 mt-5 w-full">
            <p className="text-2xl mb-10">{data.name}</p>
            <ul>
              <li className="flex flex-row font-bold text-base mb-2">
                Date/Time :&nbsp;
                <p className="font-medium">
                  {data.date} {data.time}
                </p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Venue :&nbsp;<p className="font-medium">{data.venue}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Max Ticket Amounts :&nbsp;
                <p className="font-medium">{data.maxTicketCount}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Price :&nbsp;<p className="font-medium">{data.price}won</p>
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
        <div>hi</div>
      )}
    </>
  );
}
