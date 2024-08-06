import React from "react";
import "./App.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Header from "./Components/Header/Header";
import Bridge from "./Components/Bridge/Bridge";
import SelectChainModal from "./Components/SelectChainModal/SelectChainModal";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import BridgeNew from "./Components/BridgeNew/BridgeNew";
import TransactionPopup from "./Components/TransactionPopup/TransactionPopup";
// import PrivyDemo from './Components/PrivyDemo/PrivyDemo?';
import { observer } from "mobx-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explorer from "./Components/Explorer/Explorer";
import Liquidity from "./Components/Liquidity/Liquidity";

const App = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <BridgeNew />
                </>
              }
            />
            <Route
              path="/explorer"
              element={
                <>
                  <Header />
                  <Explorer />
                </>
              }
            />

            <Route
              path="/liquidity"
              element={
                <>
                  <Header />
                  <Liquidity />
                </>
              }
            />

            <Route path="*" element={<>Page Not Found!</>} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
});

export default App;
