import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { defineChain } from 'viem'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})



export const BerachainTestnet = defineChain({
  id: 80084,
  name: 'BerachainBartio',
  nativeCurrency: { name: 'BerachainBartio', symbol: 'BERA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://bartio.rpc.berachain.com'] },
  },
  blockExplorers: {
    default: { name: 'BerachainBartioscan', url: 'https://bartio.beratrail.io' },
  },
})

export const MovementTestnet = defineChain({
  id: 30732,
  name: 'MovementTestnet',
  nativeCurrency: { name: 'MovementTestnet', symbol: 'MOVE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mevm.devnet.imola.movementlabs.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MovementTestnetscan', url: 'https://explorer.mevm.devnet.m2.movementlabs.xyz' },
  },
})

