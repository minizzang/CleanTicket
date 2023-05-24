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

  // .... likewise

  return (
    <>
      <Web3Button />
    </>
  )
}