"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "../../lib/TicketNFTFactory";
import { wGetMyConcertInfo, wGetMyTickets } from "../web3Functions";

export default function MyPage() {
  const { isConnected, address } = useAccount();

  const [isTicketManager, setIsTicketManager] = useState(false);
  const [concertList, setConcertList] = useState([]);
  const [ticketList, setTicketList] = useState([]);

  // Check is user in whitelist or not
  // TODO. user에 대한 정보를 global하게 뿌려서 로딩시간 단축?
  const checkIsManager = async () => {
    if (isConnected) {
      await readContract({
        address: TicketNFTFactoryAddress,
        abi: TicketNFTFactoryAbi,
        functionName: "checkValidity",
        args: [address],
      }).then(async (res) => {
        if (res) {
          setIsTicketManager(true);
          // Get concert info
          await wGetMyConcertInfo(address).then((myConcerts) => {
            setConcertList(myConcerts);
          });
        }
      });
    }
  };

  const getUserTickets = async () => {
    await wGetMyTickets(address).then((res) => {
      setTicketList(res);
    });
  };

  useEffect(() => {
    checkIsManager();
    getUserTickets();
  }, []);

  return (
    <div className="flex flex-col items-center max-w-6xl w-full px-28 mx-auto py-5">
      {isTicketManager ? (
        <>
          <p className="font-bold text-xl text-main-purple self-start">
            Ticket Management
          </p>
          {concertList.map((elem) => (
            <div
              key={elem.addr}
              className="bg-gray-50 rounded-xl m-5 p-3 drop-shadow-md w-5/6 h-40 flex flex-col items-center justify-center"
            >
              <p className="font-bold text-xl">{elem.name}</p>

              <ol className=" list-disc">
                <li>
                  date/time: {elem.date} {elem.time}
                </li>
                <li>concert price: {elem.price}eth</li>
                <li>remaining tickets: 4/{elem.maxTicketCount}</li>
              </ol>

              <button className="bg-yellow-200 rounded-lg text-lg">
                Stop selling
              </button>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}

      <p className="font-bold text-xl self-start">My Tickets</p>
      {true ? (
        ticketList.map((elem) => (
          <div
            key={elem.addr}
            className="bg-gray-50 rounded-xl m-5 p-3 drop-shadow-md w-5/6 h-40 flex flex-col items-center justify-center"
          >
            <p className="font-bold text-xl">{elem.name}</p>

            <ol className=" list-disc">
              <li>contract address: {elem.addr}</li>
              <li>token id: {elem.tokenId}</li>
              <li>
                date/time: {elem.date} {elem.time}
              </li>
            </ol>
          </div>
        ))
      ) : (
        <p className="text-gray-300 font-black text-2xl py-10">
          No tickets available
        </p>
      )}
    </div>
  );
}
