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
import { useTransactionReceipt, useWriteContract } from "wagmi";
import { ethers, parseEther } from "ethers";

type Props = {
    isOpen:boolean,
    onOpen:any,
    onClose:any
    chain?:any
};

const addToAbi = [
  {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintAmount",
				"type": "uint256"
			}
		],
		"name": "addToPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
] as const
export const abi = [
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const

const LiquidityPopup = ({isOpen, onOpen, onClose,chain}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { writeContract, data, isPending, isSuccess, status,error } = useWriteContract();
  const {data:txReceiptData} = useTransactionReceipt({
    hash:data
  })
  const balance = 10;
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const onClickPercent = (percent:number) =>{
    setInputValue(String(balance*percent))
  }

  const onSubmit = () =>{
    console.log("on deposit clicked",inputValue)
      try {
        const result = writeContract({ 
          abi:AbiPool,
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          functionName: 'addToPool',
          args: [
            parseEther("0.001"),
          ],
          value:parseEther("0.001")
        });
      
      } catch (err) {
        console.log("err", err);
      }
  }
  useEffect(() => {
    console.log("Error ->",error?.cause,error?.message,error?.name,error)
  }, [error])
  useEffect(() => {
    
  }, [data])
  useEffect(() => {
    
  }, [txReceiptData])

  
  
  return (
    <div className="LiquidityPopupRoot">
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
           sx={{
            backgroundColor:"#FFFFFF",
            borderRadius:"26px",
            width:"434px",
            boxShadow:"0px 0px 0px 1px #09194821,0px 1px 2px 0px #12376914"
           }}
        >
          <ModalHeader borderBottom="1px solid #F1F2F4">Deposit {status}-{error && error.message} 
            <p>hash - {data}</p>
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
                   value={inputValue}
                   /><span className="nativeToken">ETH</span>
                </div>
                <div className="amountInUSD">$291.23</div>
              </div>
              <div className="chainDisplay">
                <img src={chain && iconMap[chain.id]} alt="logo" className="chainImg" />
                <div className="chainInfo">
                  ETH {chain && chain.id}<span className="balance">Balance: {balance}</span>
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
                <button onClick={onSubmit}>Deposit</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LiquidityPopup