type chainType = {
  name: string;
  id: number;
  nativeCurrency?: any;
  iconUrl?:any
  contractAddress?:any
};

interface Network {
  networkName: string;
  chainID: number;
  baseToken: string;
  decimals: number;
  routerContract?: `0x${string}`;
  rpc?:any;
  feedaddress?:`0x${string}`
  platformFeePercentage?:number
  gweiLimit?:number
  isGasByLifi?:boolean
}

interface Networks {
  [key: string]: Network;
}

type quoteType = {
  fees: number | "";
  outputTokenAmount: number;
};

interface ImageMapType {
  [key: string]: string | any;
}

interface portfolioType {
  [key: string]:PorfolioChains
  
}

type PorfolioChains = {
  balance : string
  balanceRawInteger: string
  chainID:number
  baseToken:string
  // balanceUsd: string
  // blockchain: string
  // holderAddress: `0x${string}`
  // thumbnail: string
  // tokenDecimals: number
  // tokenName: string
  // tokenPrice:string
  // tokenSymbol: string
  // tokenType: string
}

export type {
  chainType,
  Network,
  Networks,
  quoteType,
  ImageMapType,
  portfolioType
};
