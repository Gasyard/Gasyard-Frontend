import React from 'react';
import './App.css';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Header from './Components/Header/Header';
import Bridge from './Components/Bridge/Bridge';
import SelectChainModal from './Components/SelectChainModal/SelectChainModal';
import { ChakraProvider } from '@chakra-ui/react'
import BridgeNew from './Components/BridgeNew/BridgeNew';
// import PrivyDemo from './Components/PrivyDemo/PrivyDemo?';


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <BridgeNew />
        {/* <Bridge /> */}
        {/* <SelectChainModal /> */}
        {/* <w3m-button balance='show'/> */}
      
      </div>
    </ChakraProvider>
  );
}

export default App;
