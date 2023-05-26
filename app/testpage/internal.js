"use client";
import { useEffect, useState } from "react";
import { Web3Button } from "@web3modal/react";
import { useAccount, useWalletClient, useBalance } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { formatEther, parseEther } from "viem";
import { mainnet, sepolia } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";
import { TicketNFTAbi } from "../../lib/TicketNFT";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "../../lib/TicketNFTFactory";
import pinata from "./pinata";

export function Internal() {
  const { setDefaultChain } = useWeb3Modal();
  setDefaultChain(sepolia);

  const { isConnected, address } = useAccount();
  const [ethBalance, setEthBalance] = useState("0");
  const { data: walletClient } = useWalletClient();
  const { data: ethBalanceData } = useBalance({
    address,
  });

  const [userAddr, setUserAddress] = useState("");
  const [validUser, setValidUser] = useState("");
  const [info, setInfo] = useState("");

  const [userAddr2, setUserAddress2] = useState("");
  const [info2, setInfo2] = useState("");
  const [info3, setInfo3] = useState("");

  const fetchEthBalance = async () => {
    if (!isConnected) return;
    const res = ethBalanceData?.formatted;
    setEthBalance(res);
  };

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
    setValidUser(res.toString());
  };

  // Create ticket
  // 만들어진 컨트랙트 주소들 관리
  const createTicketNFT = async () => {
    // Fill it using hook
    // ERC-721 metadata json form
    const metadata = {
      name: "IU", // concertName
      description: "IU concert!!", // description
      image: "ipfs://QmVg93vXweHfchP3TbqpLZthdX37J9u6j7UpHd5MSq3XzV", // URI of imagefile - How to get image uri?~?
      attributes: [
        {
          trait_type: "concertName",
          value: "IU",
        },
        {
          trait_type: "concertDate",
          value: "20230526",
        },
        {
          trait_type: "startTime",
          value: "1900GMT",
        },
        {
          trait_type: "maxTicketCount",
          value: 1500,
        },
        {
          trait_type: "ticketPrice",
          value: 1,
        },
        {
          trait_type: "category",
          value: "Music",
        },
        {
          trait_type: "location",
          value: "KAIST",
        },
      ],
    };

    // Optional pinata metadata
    const options = {
      pinataMetadata: {
        name: metadata.name,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const pinataResponse = await pinata.pinJSONToIPFS(metadata, options);
    const tokenURI = `ipfs://${pinataResponse.IpfsHash}`;
    const res = await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "createTicketNFT",
      args: [
        metadata.name,
        metadata.attributes[3].value,
        metadata.attributes[4].value,
        tokenURI,
      ],
    });
    alert(`successfully created ${metadata.name} ticketNFT contract!`);
  };

  // Get whole concert info
  const getConcertInfo = async () => {
    if (!isConnected) return;
    const res = await readContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "getConcertInfo",
    });
    // res is object array : contains ticketNFTaddress, owner of it, finish(bool), tokenURI
    for (var i = 0; i < res.length; i++) {
      var obj = res[i];
      // retrieve data from ipfs
      const ooo = await fetch(
        obj.tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
      ).then((res) => res.json());
      console.log(obj.ticketNFTAddress, obj.contractOwner, ooo, obj.finish);
    }
    // setInfo(JSON.stringify(ooo));
  };

  // Test codes for TicketNFT contract
  // Address for above ticketNFT contract
  const ticketNFTaddress = "0x0c1E677813264b3742F97BDE357A47AAcf242E5a";

  // Setting concert finish value true
  const concertOver = async () => {
    const res = await writeContract({
      address: ticketNFTaddress,
      abi: TicketNFTAbi,
      functionName: "concertOver",
    });
    alert(`Concert over setting done.`);
  };

  // Array [address], each address has index + 1 tokenId
  const getUserInfo = async () => {
    if (!isConnected) return;
    const res = await readContract({
      address: ticketNFTaddress,
      abi: TicketNFTAbi,
      functionName: "getUserInfo",
    });
    setInfo2(res.toString());
  };

  // Return given user address's tokenId > 1 (balanceOf)
  // If no token -> 0
  const balanceOf = async () => {
    if (!isConnected) return;
    const res = await readContract({
      address: ticketNFTaddress,
      abi: TicketNFTAbi,
      functionName: "balanceOf",
      args: [userAddr2],
    });
    setInfo3(res.toString());
  };

  // Buy ticket (max 1)
  const sellTicket = async () => {
    const res = await writeContract({
      address: ticketNFTaddress,
      abi: TicketNFTAbi,
      functionName: "sellTicket",
      args: [userAddr2],
      value: parseEther("0.015").toString(),
    });
    alert(`successfully mint and transfer ticket NFT!`);
    fetchEthBalance();
  };

  useEffect(() => {
    if (isConnected) {
      fetchEthBalance();
    }
  }, [isConnected, address]);

  return (
    <>
      <Web3Button />
      <p>Eth balance: {ethBalance}</p>
      <input
        className="border 5px"
        value={userAddr}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button className="border 5px" onClick={addWhiteList}>
        Add whitelist
      </button>
      <button className="border 5px" onClick={removeWhiteList}>
        Remove from whitelist
      </button>
      <button className="border 5px" onClick={verifyUser}>
        Verify user address
      </button>
      <p>
        User {userAddr} is {validUser}
      </p>

      <button className="border 5px" onClick={createTicketNFT}>
        Create ticket!
      </button>
      <button className="border 5px" onClick={getConcertInfo}>
        GetConcertInfo
      </button>
      <p>{info}</p>
      <br></br>
      <br></br>
      <p>Below is for ticketNFT contract test</p>
      <p>Test for {ticketNFTaddress}</p>
      <input
        className="border 5px"
        value={userAddr2}
        onChange={(e) => setUserAddress2(e.target.value)}
      />
      <button className="border 5px" onClick={getUserInfo}>
        Get all user info
      </button>
      <button className="border 5px" onClick={balanceOf}>
        Given user tokenId
      </button>
      <button className="border 5px" onClick={sellTicket}>
        Buy ticket
      </button>
      <p>All user info: {info2}</p>
      <p>Given users tokenId: {info3}</p>
    </>
  );
}
