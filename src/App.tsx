import React from 'react';
import './App.css';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Header from './Components/Header/Header';
import Bridge from './Components/Bridge/Bridge';
import SelectChainModal from './Components/SelectChainModal/SelectChainModal';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import BridgeNew from './Components/BridgeNew/BridgeNew';
import TransactionPopup from './Components/TransactionPopup/TransactionPopup';
// import PrivyDemo from './Components/PrivyDemo/PrivyDemo?';


function App() {

  const { isOpen, onOpen,onClose } = useDisclosure()
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <BridgeNew />
      </div>
    </ChakraProvider>
  );
}

export default App;
