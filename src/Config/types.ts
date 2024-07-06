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



export type {
  chainType,
  Network,
  Networks,
  quoteType,
  ImageMapType,
  
};
