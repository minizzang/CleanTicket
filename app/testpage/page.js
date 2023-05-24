"use client"

// Check layout.js -> example: npx create-wagmi 
import { Internal } from "./internal"

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const chains = [sepolia];
const projectId = "8e1dc946975085aad108936266fc9da5";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Testpage() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className="flex flex-col items-center max-w-6xl w-full px-28 mx-auto py-5">
          <p className="font-bold text-xl text-main-purple self-start">
          Web3 feature test
          </p>
          <Internal></Internal>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}