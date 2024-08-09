import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { iconMap } from "../../Config/data";
import './LiquidityPopup.css'
import { AbiPool } from "../../Config/JSON/AbiPool";
import { useReadContract, useTransactionReceipt, useWriteContract } from "wagmi";
import { ethers, parseEther } from "ethers";
import LiquidityTransactionPopup from "../TransactionPopup/LiquidityTransactionPopup";
import { CompareValues } from "../../Config/utils";
import { pool_abi } from "../../Config/abi";
type Props = {
    is_liquidtyModalOpen:boolean,
    onOpen:any,
    on_liquidtyModalClose:any
    chain?:any
};


const LiquidityPopup = ({is_liquidtyModalOpen, on_liquidtyModalClose,chain}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { writeContract, data, isPending, isSuccess, status,error } = useWriteContract();
  const {data:txReceiptData} = useTransactionReceipt({
    hash:data
  })
  
  const { data:pool_balance } = useReadContract({
    abi:pool_abi,
    functionName: 'balanceOf',
    args: [chain && chain.liquidityPool],
  })
  const fetchBalance = (contract:`0x${string}`) =>{
    

    console.log("balance",data)
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const balance = 10;
  const [openTransactionPopup, setopenTransactionPopup] = useState(false);

  const ClearState = () =>{
    setInputValue("")
  }

  const handleInputChange = (e:any) => {
    var value = e.target.value;

    var ele = value.split(".");
    if (ele[1] && ele[1].length > 5) {
      var e = ele[1];
      e = e.substring(0, 5);
      value = ele[0] + "." + e;
    }
    setInputValue(value);
  };

  const onClickPercent = (percent:number) =>{
    setInputValue(String(balance*percent))
  }

  const setTransactionModal = (value: boolean) => {
    setopenTransactionPopup(value);
  };

  //const web3instance = new <Web></Web>()
  
  const onSubmit = () =>{
    console.log("on deposit clicked",inputValue)
      try {

        const result = writeContract({ 
          abi:AbiPool,
          address: chain.liquidityPool,
          functionName: 'addToPool',
          args: [
            parseEther("0.001"),
          ],
          value:parseEther("0.001")
        });
        setopenTransactionPopup(true)
      } catch (err) {
        console.log("err", err);
      }
  }
  const isNumberKey = (evt: any) => {
    const charCode = evt.which ? evt.which : evt.keyCode;

    // Check if the character is a dot (.)
    if (charCode === 46) {
      // Allow the dot if it's not already present in the input value
      if (inputValue.indexOf(".") === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      // Allow digits (0-9)
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
    }

    return true;
  };
  useEffect(() => {
    console.log("Error ->",error?.cause,error?.message,error?.name,error)
  }, [error])
  useEffect(() => {
    
  }, [data])
  useEffect(() => {
    if(chain){
      console.log("pool_balance",chain?.liquidityPool)
      fetchBalance(chain.liquidityPool)
    }
    
  }, [chain])

  
  
  return (
    <div className="LiquidityPopupRoot">
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal blockScrollOnMount={false} isOpen={is_liquidtyModalOpen} onClose={on_liquidtyModalClose}>
        <ModalOverlay />
        <ModalContent
           sx={{
            backgroundColor:"#FFFFFF",
            borderRadius:"26px",
            width:"434px",
            boxShadow:"0px 0px 0px 1px #09194821,0px 1px 2px 0px #12376914"
           }}
        >
          <ModalHeader borderBottom="1px solid #F1F2F4">Deposit {status} 
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingLeft={"0px"} paddingRight={"0px"}>
            <div className="BodyWrap">
              <div className="amountDisplay">
                <div className="nativeAmount">
                  <input type="text"
                   placeholder="0.0"
                   style={{ width: `${inputValue.length + 3}ch` }}
                   onChange={handleInputChange}
                   onKeyPress={(e) => {
                      if (!isNumberKey(e)) {
                        e.preventDefault();
                      }
                    }}
                   value={inputValue}
                   /><span className="nativeToken">{chain && chain.nativeCurrency.symbol}</span>
                </div>
                <div className="amountInUSD">$291.23</div>
              </div>
              <div className="chainDisplay">
                <img src={chain && iconMap[chain.id]} alt="logo" className="chainImg" />
                <div className="chainInfo">
                   {chain && chain.nativeCurrency.symbol}<span className="balance">Balance: {balance}</span>
                </div>
              </div>
              <div className="percentDisplay">
                <button onClick={() => onClickPercent(0.25)}>25%</button>
                <button onClick={() => onClickPercent(0.5)}>50%</button>
                <button onClick={() => onClickPercent(0.7)}>75%</button>
                <button onClick={() => onClickPercent(1)}>100%</button>
              </div>
              <div className="QuoteDisplay">
                {/* <div className="quote_row">
                  <div className="quote_column col1">Points Earned</div>
                  <div className="quote_column col2"><span className="coin"></span>+400</div>
                </div> */}
                <div className="quote_row">
                  <div className="quote_column col1">Network</div>
                  <div className="quote_column col2">{chain && chain.name}</div>
                </div>
                {/* <div className="quote_row">
                  <div className="quote_column col1">Network Fee</div>
                  <div className="quote_column col2">
                    $0.12 USD
                  </div>
                </div> */}
              </div>
              <div className="SubmitBtn">
                <button onClick={onSubmit} disabled={!CompareValues(inputValue,String(balance))}>Deposit</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <LiquidityTransactionPopup 
       isOpen={openTransactionPopup}
       onOpen={onOpen}
       onClose={onClose}
       setModal={setTransactionModal}
       rejected={status === "error"}
       success={status === "success"}
       pending={status === "pending"}
       onSubmit={onSubmit}
       txReceiptHash={txReceiptData}
       chain={chain}
       ClearState={ClearState}
       error={error ? error.message : ""}
       txHash={data}
       isDeposit={true}
      />
    </div>
  );
};

export default LiquidityPopup