import arbitumlogo from "../assets/chains/arbitrum.svg";
import baselogo from "../assets/chains/base.svg";
import bsclogo from "../assets/chains/bsc.svg";
import ethereumlogo from "../assets/chains/ethereum.svg";
import polygonlogo from "../assets/chains/polygon.svg";
import scrolllogo from "../assets/chains/scroll.svg";
import mantlelogo from "../assets/chains/mantle.svg";
import sepolialogo from "../assets/coins/sepolia.png";
import selectLogo from "../assets/chains/select.png";
import morphlogo from '../assets/chains/Morph.png';
import karakotlogo from '../assets/chains/kakarot.png'
import berachianlogo from '../assets/chains/berchain.png' 
import movementLogo from '../assets/chains/movmenttestnet.jpg'
import { ImageMapType, Networks } from "./types";

const iconMap: ImageMapType = {
  "42161": arbitumlogo,
  "8453": baselogo,
  "56": bsclogo,
  "1": ethereumlogo,
  "137": polygonlogo,
  "534352": scrolllogo,
  "5000": mantlelogo,
  "11155111": sepolialogo,
  "421614": arbitumlogo,
  "84532":sepolialogo,
  "2810":morphlogo,
  "1802203764":karakotlogo,
  "80084":berachianlogo,
  "30732":movementLogo
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
  "8453": {
    networkName: "base",
    chainID: 8453,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://rpc.ankr.com/base",
    feedaddress: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    platformFeePercentage: 2.5,
    gweiLimit: 1000000,
    isGasByLifi: true,
    explorer: "https://basescan.org/tx/",
    explorerAddress:"https://basescan.org/address/"
  },
  "137": {
    networkName: "polygon",
    chainID: 137,
    baseToken: "MATIC",
    decimals: 18,
    routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  "42161": {
    networkName: "arbitrum",
    chainID: 42161,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://rpc.ankr.com/arbitrum",
    feedaddress: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    platformFeePercentage: 2.5,
    gweiLimit: 1000000,
    isGasByLifi: true,
    explorer: "https://arbiscan.io/tx/",
    explorerAddress:"https://arbiscan.io/address/"
  },
  "56": {
    networkName: "bsc",
    chainID: 56,
    baseToken: "BNB",
    decimals: 18,
    routerContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  "534352": {
    networkName: "scroll",
    chainID: 534352,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://1rpc.io/scroll",
    feedaddress: "0x6bF14CB0A831078629D993FDeBcB182b21A8774C",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    liquidityPool: "0xB127256729cD60988f681eFe4522aB1E30619e59",
    platformFeePercentage: 2.5,
    gweiLimit: 1000000,
    isGasByLifi: true,
    minimumGas: 0.001,
    explorer: "https://scrollscan.com/tx/",
    explorerAddress: "https://scrollscan.com/address/",
  },
  "5000": {
    networkName: "mantle",
    chainID: 5000,
    baseToken: "MNT",
    decimals: 18,
    rpc: "https://rpc.mantle.xyz",
    feedaddress: "0x6bF14CB0A831078629D993FDeBcB182b21A8774C",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    liquidityPool: "0xB127256729cD60988f681eFe4522aB1E30619e59",
    platformFeePercentage: 2.5,
    gweiLimit: 1000000,
    isGasByLifi: false,
    minimumGas: 0.001,
    explorer: "https://mantlescan.info/tx/",
    explorerAddress: "https://mantlescan.info/address/",
  },
  84532: {
    networkName: "basesepolia",
    chainID: 84532,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://base-sepolia-rpc.publicnode.com",
    feedaddress: "0x0000000000000000000000000000000000000000",
    routerContract: "0x6376F86bc08243D154b406b0E84F8Af2C627fFC7",
    liquidityPool: "0x3f7b7bA399fA8Ae547F96c31F03fa27564564Cc6",
    priceProvider:
      "https://api.bybit.com/v5/market/tickers?category=spot&symbol=ETHUSDT",
    platformFeePercentage: 1,
    gweiLimit: 100000,
    isGasByLifi: false,
    minimumGas: 0.0001,
    explorer: "https://sepolia.basescan.org/tx/",
    explorerAddress: "https://sepolia.basescan.org/address/",
  },
  421614: {
    networkName: "arbitrumsepolia",
    chainID: 421614,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://sepolia-rollup.arbitrum.io/rpc",
    feedaddress: "0x0000000000000000000000000000000000000000",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    liquidityPool: "0xB127256729cD60988f681eFe4522aB1E30619e59",
    priceProvider:
      "https://api.bybit.com/v5/market/tickers?category=spot&symbol=ETHUSDT",
    platformFeePercentage: 1,
    gweiLimit: 400000,
    isGasByLifi: false,
    minimumGas: 0.0001,
    explorer: "https://sepolia.arbiscan.io/tx/",
    explorerAddress: "https://sepolia.arbiscan.io/address/",
  },
  2810: {
    networkName: "morphtestnet",
    chainID: 2810,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://rpc-holesky.morphl2.io",
    feedaddress: "0x0000000000000000000000000000000000000000",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    liquidityPool: "0xB127256729cD60988f681eFe4522aB1E30619e59",
    priceProvider:
      "https://api.bybit.com/v5/market/tickers?category=spot&symbol=ETHUSDT",
    platformFeePercentage: 1,
    gweiLimit: 400000,
    isGasByLifi: false,
    minimumGas: 0.001,
    explorer: "https://explorer-holesky.morphl2.io/tx/",
    explorerAddress: "https://explorer-holesky.morphl2.io/address/"
  },
  30732: {
    networkName: "movetestnet",
    chainID: 30732,
    baseToken: "MOVE",
    decimals: 18,
    rpc: "https://mevm.testnet.imola.movementlabs.xyz",
    feedaddress: "0x0000000000000000000000000000000000000000",
    priceProvider:
      "https://api.bybit.com/v5/market/tickers?category=spot&symbol=MNTUSDT",
    routerContract: "0x3f7b7bA399fA8Ae547F96c31F03fa27564564Cc6",
    liquidityPool: "0x3AF7Fd52DA42e9f1626C026Ab7dEa4B668085743",
    platformFeePercentage: 1,
    gweiLimit: 400000,
    isGasByLifi: false,
    minimumGas: 0.001,
    explorer: "https://explorer.mevm.devnet.m2.movementlabs.xyz/tx/",
    explorerAddress: "https://explorer.mevm.devnet.m2.movementlabs.xyz/address/",
  },
  1802203764: {
    networkName: "kakarottestnet",
    chainID: 1802203764,
    baseToken: "ETH",
    decimals: 18,
    rpc: "https://sepolia-rpc.kakarot.org",
    feedaddress: "0x0000000000000000000000000000000000000000",
    priceProvider:
      "https://api.bybit.com/v5/market/tickers?category=spot&symbol=ETHUSDT",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    liquidityPool: "0xB127256729cD60988f681eFe4522aB1E30619e59",
    platformFeePercentage: 1,
    gweiLimit: 400000,
    isGasByLifi: false,
    minimumGas: 0.001,
    explorer: "https://sepolia.kakarotscan.org/tx/",
    explorerAddress: "https://sepolia.kakarotscan.org/address/",
  },
  80084: {
    networkName: "berachaintestnet",
    chainID: 80084,
    baseToken: "BERA",
    decimals: 18,
    rpc: "https://bartio.rpc.berachain.com",
    feedaddress: "0x0000000000000000000000000000000000000000",
    priceProvider:
      "https://api.bybit.com/v5/market/tickers?category=spot&symbol=MNTUSDT",
    routerContract: "0x962aFaAc50017cA191EE362B60aA137D9BBD2850",
    liquidityPool: "0xB127256729cD60988f681eFe4522aB1E30619e59",
    platformFeePercentage: 1,
    gweiLimit: 400000,
    isGasByLifi: false,
    minimumGas: 0.001,
    explorer: "https://bartio.beratrail.io/tx/",
    explorerAddress: "https://bartio.beratrail.io/address/",
  },
  
};


export { iconMap, ChainJsonData };
