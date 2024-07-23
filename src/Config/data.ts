import arbitumlogo from "../assets/chains/arbitrum.svg";
import baselogo from "../assets/chains/base.svg";
import bsclogo from "../assets/chains/bsc.svg";
import ethereumlogo from "../assets/chains/ethereum.svg";
import polygonlogo from "../assets/chains/polygon.svg";
import scrolllogo from "../assets/chains/scroll.svg";
import sepolialogo from "../assets/coins/sepolia.png";
import selectLogo from "../assets/chains/select.png";
import { ImageMapType, Networks } from "./types";

const iconMap: ImageMapType = {
    "42161": arbitumlogo,
    "8453": baselogo,
    "56": bsclogo,
    "1": ethereumlogo,
    "137": polygonlogo,
    "534352": scrolllogo,
    "11155111": sepolialogo,
    "421614":sepolialogo
};
const ChainJsonData: Networks = {
    "1": {
      networkName: "ethereum",
      chainID: 1,
      baseToken: "ETH",
      decimals: 18,
      routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    "11155111": {
      networkName: "sepolia",
      chainID: 11155111,
      baseToken: "ETH",
      decimals: 18,
      routerContract: "0x757cdB32B7ae88F7cAEbB08e53d374A0834D87ca",
    },
    "84532": {
      networkName: "basesepolia",
      chainID: 84532,
      baseToken: "ETH",
      decimals: 18,
      routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    "421614": {
      networkName: "arbitrumsepolia",
      chainID: 421614,
      baseToken: "ETH",
      decimals: 18,
      routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    "8453": {
      "networkName": "base",
      "chainID":8453,
      "baseToken": "ETH",
      "decimals":18,
      "rpc": "https://rpc.ankr.com/base",
      "feedaddress": "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
      "routerContract":"0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
      "platformFeePercentage":2.5,
      "gweiLimit":1000000,
      "isGasByLifi":true
    },
    "137": {
      networkName: "polygon",
      chainID: 137,
      baseToken: "MATIC",
      decimals: 18,
      routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    "42161": {
      "networkName": "arbitrum",
      "chainID":42161,
      "baseToken": "ETH",
      "decimals":18,
      "rpc": "https://rpc.ankr.com/arbitrum",
      "feedaddress": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
      "routerContract":"0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
      "platformFeePercentage":2.5,
      "gweiLimit":1000000,
      "isGasByLifi":true
    },
    "56": {
      networkName: "bsc",
      chainID: 56,
      baseToken: "BNB",
      decimals: 18,
      routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    "534352": {
      "networkName": "scroll",
      "chainID":534352,
      "baseToken": "ETH",
      "decimals":18,
      "rpc": "https://1rpc.io/scroll",
      "feedaddress": "0x6bF14CB0A831078629D993FDeBcB182b21A8774C",
      "routerContract":"0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
      "liquidityPool":"0xB127256729cD60988f681eFe4522aB1E30619e59",
      "platformFeePercentage":2.5,
      "gweiLimit":1000000,
      "isGasByLifi":true,
      "minimumGas":0.001,
      
  }
,
  };
export {
    iconMap,
    ChainJsonData
}