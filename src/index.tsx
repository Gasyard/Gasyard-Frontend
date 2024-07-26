import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { movementTestnet } from "./Config/chains";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  mainnet,
  sepolia,
  base,
  polygon,
  bsc,
  scroll,
  Chain,
  baseSepolia,
  optimism,
  mantle,
  arbitrumSepolia,
  morphSepolia
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import arbitumlogo from './assets/chains/arbitrum.svg'
import baselogo from './assets/chains/base.svg'
import bsclogo from './assets/chains/bsc.svg'
import ethereumlogo from './assets/chains/ethereum.svg'
import optimismlogo from './assets/chains/optimism.svg'
import polygonlogo from './assets/chains/polygon.svg'
import scrolllogo from './assets/chains/scroll.svg'
import sepolialogo from "./assets/coins/sepolia.png";
import mantlelogo from "./assets/chains/mantle.svg"
import { ChainJsonData } from "./Config/data";

import { PrivyProvider } from '@privy-io/react-auth';


// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "b46e700f99389f8e96d969c863bfd0e8";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};



let config;
console.log("HELLO" + process.env.REACT_APP_SERVER)
if (process.env.REACT_APP_SERVER == "testnet") {
  const chains = [
    {
      ...baseSepolia,
      iconUrl: sepolialogo,
      contractAddress: ChainJsonData["84532"].routerContract
    },
    {
      ...arbitrumSepolia,
      iconUrl: sepolialogo,
      contractAddress: ChainJsonData["421614"].routerContract
    },
    {
      ...morphSepolia,
      iconUrl: sepolialogo,
      contractAddress: ChainJsonData["2710"].routerContract
    },
    {
      ...movementTestnet,
      iconUrl: sepolialogo,
      contractAddress: ChainJsonData["30732"].routerContract
    }
  ] as const;

  config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    // ...wagmiOptions // Optional - Override createConfig parameters
  });
}
else {
  const chains = [
    // {
    //   ...mainnet,
    //   iconUrl: ethereumlogo,
    //   contractAddress:ChainJsonData["1"].routerContract

  // },
  {
    ...arbitrum,
    iconUrl: arbitumlogo,
    contractAddress:ChainJsonData["42161"].routerContract,
    explorer:"https://arbiscan.io/tx/"
  },
  // {
  //   ...sepolia,
  //   iconUrl: sepolialogo,
  //   contractAddress:ChainJsonData["11155111"].routerContract
  // },
  {
    ...base,
    iconUrl: baselogo,
    contractAddress:ChainJsonData["8453"].routerContract,
    explorer:"https://basescan.org/tx/"
  },
  // { ...polygon, 
  //   iconUrl: polygonlogo,
  //   contractAddress:ChainJsonData["137"].routerContract
  // },
  // { ...bsc, 
  //   iconUrl: bsclogo,
  //   contractAddress:ChainJsonData["56"].routerContract
  // },
  { ...scroll, 
    iconUrl: scrolllogo,
    contractAddress:ChainJsonData["534352"].routerContract,
    explorer:"https://scrollscan.com/tx/"
  },
  // {
  //   ...baseSepolia,
  //   iconUrl:sepolialogo,
  //   contractAddress:ChainJsonData["84532"].routerContract
  // }
] as const;

  config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    // ...wagmiOptions // Optional - Override createConfig parameters
  });
}


// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': 'red',
    "--w3m-border-radius-master": "2px"
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
