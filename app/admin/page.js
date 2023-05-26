"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "../../lib/TicketNFTFactory";

export default function Admin() {
  // For web3
  const { isConnected, address } = useAccount(); // TODO. 관리자 wallet이면 OK하는 로직
  //

  const [isAdmin, setIsAdmin] = useState(true);
  const [waitingList, setWatingList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [changed, setChanged] = useState(false);

  // Get all manager list from DB (waiting & accepted)
  const getManagerList = async () => {
    await axios.get("/admin/route").then((res) => {
      const list = res.data.managerList;
      let managerList = list.filter((elem) => elem.isAccepted === true);
      setManagerList(managerList);
      let waitingList = list.filter((elem) => elem.isAccepted === false);
      setWatingList(waitingList);
    });
  };

  // Add user whiteList (Contract & DB)
  const acceptManager = async (wallet) => {
    await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "addWhiteList",
      args: [wallet],
    }).then(async (res) => {
      await axios.put(`/admin/${wallet}`).then((res) => {
        setChanged(!changed);
      });
    });
  };

  // Reject manager request (DB)
  const rejectManager = async (wallet) => {
    await axios.delete(`/admin/${wallet}`).then((res) => {
      setChanged(!changed);
    });
  };

  // Remove user from whiteList (Contract & DB)
  const removeManager = async (wallet) => {
    await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "removeWhiteList",
      args: [wallet],
    }).then(async (res) => {
      await axios.delete(`/admin/${wallet}`).then((res) => {
        setChanged(!changed);
      });
    });
  };

  useEffect(() => {
    getManagerList();
  }, [changed]);

  return (
    <div className="flex flex-col items-center max-w-6xl w-full px-28 mx-auto py-5">
      {isAdmin ? (
        <>
          <p className="font-bold text-xl self-start">
            Ticket Manager Waiting List
          </p>
          <div className="flex flex-row w-full h-64 py-4 overflow-x-scroll">
            {waitingList.map((data) => (
              <div
                key={data.wallet}
                className="flex flex-col bg-gray-50 rounded-xl p-3 drop-shadow-md max-w-[10rem] min-w-[10rem] h-full mx-3"
              >
                <div className="h-[75%] overflow-scroll whitespace-break-spaces">
                  <div className="flex flex-col items-center mb-2">
                    <p className="text-xs">Name</p>
                    <p className="text-sm font-semibold">{data.name}</p>
                  </div>

                  <div className="flex flex-col items-center mb-2">
                    <p className="text-xs ">Company</p>
                    <p className="text-sm font-semibold">{data.company}</p>
                  </div>

                  <div className="flex flex-col items-center mb-2">
                    <p className="text-xs">Phone</p>
                    <p className="text-sm font-semibold">{data.phone}</p>
                  </div>
                </div>

                <div className="flex flex-row w-full items-end justify-between h-[25%]">
                  <button
                    className=" bg-blue-300 w-[47%] h-9 rounded-full font-medium text-white"
                    onClick={() => acceptManager(data.wallet)}
                  >
                    Accept
                  </button>
                  <button
                    className=" bg-red-300 w-[47%] h-9 rounded-full font-medium text-white"
                    onClick={() => rejectManager(data.wallet)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="font-bold text-xl self-start mt-4">
            Ticket Manager List
          </p>
          <div className="flex flex-row w-full h-64 py-4 overflow-x-scroll">
            {managerList.map((data) => (
              <div
                key={data.wallet}
                className="flex flex-col bg-gray-50 rounded-xl p-3 drop-shadow-md min-w-[10rem] h-full mx-3"
              >
                <div className="h-[75%] overflow-scroll whitespace-break-spaces">
                  <div className="flex flex-col items-center mb-2">
                    <p className="text-xs">Name</p>
                    <p className="text-sm font-semibold">{data.name}</p>
                  </div>

                  <div className="flex flex-col items-center mb-2">
                    <p className="text-xs ">Company</p>
                    <p className="text-sm font-semibold">{data.company}</p>
                  </div>

                  <div className="flex flex-col items-center mb-2">
                    <p className="text-xs">Phone</p>
                    <p className="text-sm font-semibold">{data.phone}</p>
                  </div>
                </div>

                <div className="flex flex-row w-full items-end justify-between h-[25%]">
                  <button
                    className=" bg-red-300 w-full h-9 rounded-full font-medium text-white"
                    onClick={() => removeManager(data.wallet)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
