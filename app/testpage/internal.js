'use client'
import { useEffect, useState } from "react";
import { Web3Button } from "@web3modal/react";
import { useAccount, useWalletClient, useBalance } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { formatEther, parseEther } from "viem";
import { mainnet, sepolia } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";
import { TicketNFTAbi } from "../../lib/TicketNFT";
import { TicketNFTFactoryAbi, TicketNFTFactoryAddress} from "../../lib/TicketNFTFactory";

export function Internal() {
  const { setDefaultChain } = useWeb3Modal();
  setDefaultChain(sepolia);

  const { isConnected, address } = useAccount();

  const { data: walletClient } = useWalletClient();

  
  const [userAddr, setUserAddress] = useState("");
  const [validUser, setValidUser] = useState("");
  const [info, setInfo] = useState("");

  // Add user to whiteList
  const addWhiteList = async () => {
    const res = await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "addWhiteList",
      args: [userAddr],
    });
    alert(`successfully added to whitelist addr: ${userAddr}`);
  };

  // Remove user from whiteList
  const removeWhiteList = async () => {
    const res = await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "removeWhiteList",
      args: [userAddr],
    });
    alert(`successfully removed whitelist addr: ${userAddr}`);
  };

  // Check address validity of user address
  const verifyUser = async () => {
    if (!isConnected) return;
    const res = await readContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "checkValidity",
      args: [userAddr],
    });
    setValidUser(res.toString())
  };

  // Get whole concert info
  const getConcertInfo = async() => {
    if (!isConnected) return;
    const res = await readContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "getConcertInfo",
    });
    setInfo(res.toString());
  }

  // Create ticket
  // 한번 만들면 못없앰 (나중에 리스트 지우는 함수 추가 예정)
  // 만들어진 컨트랙트 주소들 관리
  const createTicketNFT = async() => {
    const res = await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "createTicketNFT",
      args: ["아이유", 20230525, 1000, 15],
    });
    alert(`successfully created ticketNFT contract in address ${res.toString()}`)
  }

  return (
    <>
      <Web3Button />
      <input className="border 5px" value={userAddr} onChange={(e) => setUserAddress(e.target.value)}/>
      <button className="border 5px" onClick={addWhiteList}>Add whitelist</button>
      <button className="border 5px" onClick={removeWhiteList}>Remove from whitelist</button>
      <button className="border 5px" onClick={verifyUser}>Verify user address</button>
      <p>User {userAddr} is {validUser}</p>


      <button className="border 5px" onClick={createTicketNFT}>Create ticket!</button>
      <button className="border 5px" onClick={getConcertInfo}>GetConcertInfo</button>
      <p>{info}</p>
    </>
  )
}