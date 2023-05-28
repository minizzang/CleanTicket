"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { useAccount } from "wagmi";
import { Web3Modal } from "@web3modal/react";

import Header from "./Header";
import "./globals.css";
import { useEffect, useState } from "react";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

const chains = [sepolia];
const projectId = "8e1dc946975085aad108936266fc9da5";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({ children }) {
  const { isConnected } = useAccount();
  const [element, setElement] = useState(<></>);

  useEffect(() => {
    if (isConnected) {
      setElement(children);
    } else {
      const elem = (
        <div className="flex items-center h-96">
          <p className=" text-center text-xl font-bold text-gray-300">
            Please connect your wallet
            <br />
            using the top button &apos;Connect Wallet&apos;
          </p>
        </div>
      );
      setElement(elem);
    }
  }, [isConnected]);

  return (
    <html lang="en">
      <body className="flex min-h-screen h-full flex-col items-center self-center font-notoSans pb-14 ">
        <WagmiConfig config={wagmiConfig}>
          <Header />
          <div className="border-b-2 border-gray-200 w-full"></div>
          {children}
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </body>
    </html>
  );
}
