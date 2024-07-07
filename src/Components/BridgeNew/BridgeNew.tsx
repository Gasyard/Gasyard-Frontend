import React, { useEffect, useState } from "react";
import "./BridgeNew.css";
import downArrow from "../../assets/SVG-black.svg";
import { Spinner, Stat, StatNumber, useDisclosure } from "@chakra-ui/react";
import QuoteSection from "../QuoteSection/QuoteSection";
import { useAccount, useChains, useSwitchChain, useWriteContract } from "wagmi";
import { chainType, quoteType } from "../../Config/types";
import { abi } from "../../Config/abi";
import { formatEther, parseEther } from "viem";
import { PortfolioAPI, sendTransaction } from "../../Config/API/api";
import SelectChainModalNew from "../SelectChainModal/SelectChainModal_new";
import arb_logo from '../../assets/arb_logo.svg'
import ReverseChain from '../../assets/reverse.svg'
import { getBalance } from '@wagmi/core'
import { config } from "../../Config/config";
import { type GetBalanceReturnType } from '@wagmi/core'
import TransactionPopup from "../TransactionPopup/TransactionPopup";
import { useWeb3Modal } from "@web3modal/wagmi/react";

type Props = {};

const BridgeNew = (props: Props) => {
  const Chains = useChains();
  const [chain1, setchain1] = useState<chainType | null>(Chains[0]);
  const [chain2, setchain2] = useState<chainType | null>(Chains[1]);

  const [inputToken, setinputToken] = useState("");
  const [outputToken, setoutputToken] = useState("");
  const [quoteData, setquoteData] = useState<quoteType | null>(null);
  const [openChainPopup, setopenChainPopup] = useState(false);
  const [openTransactionPopup, setopenTransactionPopup] = useState(false)
  const [toSelectChain, settoSelectChain] = useState<0 | 1 | 2>(0);
  const [portfolio, setportfolio] = useState(null);
  const [recepientAddress, setrecepientAddress] = useState("");
  const [recepientAddressError, setrecepientAddressError] = useState("");
  const [allvalueFilled, setallvalueFilled] = useState(false)

  const { address, isConnecting, isDisconnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { writeContract,data,isPending, isSuccess, status } = useWriteContract()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [accountBalance, setaccountBalance] = useState<GetBalanceReturnType | "">("")
  const [debouncedValue, setDebouncedValue] = useState(inputToken);
  const [submitBtnText, setsubmitBtnText] = useState("Submit Transaction")

  const { open, close } = useWeb3Modal()

  const FormHandler = () =>{
    if(chain1 && chain2 && address && inputToken !== "" && accountBalance != "" && compareValue(parseFloat(roundDecimal(inputToken)),  Number(accountBalance.value))){
      setallvalueFilled(true)
    }
    else{
      if(accountBalance && parseFloat(roundDecimal(inputToken)) >  Number(accountBalance.value)){
        setsubmitBtnText("Insufficient Gas")
      }
      setallvalueFilled(false)
    }
    
  }

  const fetchQuote = async (chain1:any,chain2:any,inputToken:any) => {
    setquoteData(null)
    setoutputToken("")
    if(chain1 && chain2 && inputToken){
      const url = "https://gasyardbackend-production.up.railway.app/api/quote";

      const options = {
        method: "POST",
        body: JSON.stringify({
          inputNetwork: chain1 && chain1.id,
          outputNetwork: chain2 && chain2.id,
          inputTokenAmount: parseFloat(inputToken) * 1000000000000000000,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(url, options);
      
      if(response.status === 400){
        setquoteData({
          fees: "",
          outputTokenAmount: 0,
        });
      }
      else{
        const result = await response.json();
        console.log(result);
        setquoteData({
          fees: result.totalFees,
          outputTokenAmount: result.outputTokenAmount,
        });
        setoutputToken(result.outputTokenAmount.toFixed(5));
        if(address && accountBalance && parseFloat(roundDecimal(inputToken)) >  Number(accountBalance.value)){
          setsubmitBtnText("Insufficient Gas")
        }
      }
      
    }
  };

  const ToggleDD = (ele: 0 | 1 | 2) => {
    settoSelectChain(ele)
    onOpen()

  };

  const handleInputChange1 = (e: any) => {
    var value = e.target.value;

    var ele = value.split(".");
    if (ele[1] && ele[1].length > 5) {
      var e = ele[1];
      e = e.substring(0, 5);
      value = ele[0] + "." + e;
    }

    setinputToken(value);
    FormHandler()
  };
  const isNumberKey = (evt: any) => {
    const charCode = evt.which ? evt.which : evt.keyCode;

    // Check if the character is a dot (.)
    if (charCode === 46) {
      // Allow the dot if it's not already present in the input value
      if (inputToken.indexOf(".") === -1) {
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
  const handleBlurEvent = () => {
    // fetchQuote(chain1,chain2,inputToken);
  };
  const onSubmit = async() =>{
    if(accountBalance !== ""){
      console.log("compare",compareValue(parseFloat(roundDecimal(inputToken)),  Number(accountBalance.value)))
    }
   
    if(chain1 && chain2 && address && inputToken !== "" && accountBalance != "" && compareValue(parseFloat(roundDecimal(inputToken)),  Number(accountBalance.value))){

      try{
        const result = await writeContract({
          abi, 
          address: chain1.contractAddress,
          functionName: 'bridgeTo',
          args: [
            chain2.id,
            address
          ],
          value:parseEther(inputToken)
        })
        setopenTransactionPopup(true)
      }
      catch(err){
        console.log("err",err)
      }

      
      
    }
    else{
      if(accountBalance === ""){
        setsubmitBtnText("Connect Wallet")
      }else if(parseFloat(roundDecimal(inputToken)) > Number(accountBalance.value)){
        setsubmitBtnText("Insufficient Gas")
      }
      
      
    }
  }
  const onChangeRecpAddress = (e:any) =>{
    var value = e.target.value
    if (!value.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      setrecepientAddressError('address must be a EVM WalletAddress');
    }else{
      setrecepientAddressError("")
    }
    setrecepientAddress(value)
  }
  const changeModal = (value:boolean,chain:chainType | null=null) =>{
    console.log(value)
    if(toSelectChain !== 0 && chain){
      if(toSelectChain === 1){
        setchain1(chain)

        if (chain2 && chain.id === chain2.id) {
          setchain2(null);
          
        }
      }else{
        setchain2(chain)
      }
    }
    setopenChainPopup(value)
  }
  const reverseChain = () =>{
    const temp = chain1;
    setchain1(chain2)
    setchain2(temp)
  }
  const setTransactionModal = (value:boolean) =>{
    setopenTransactionPopup(value)
  }
  const GetBalance = async() =>{
    if(address){
        const balance = await getBalance(config,{
            address: address,
            chainId: 1, 
        })
        console.log("balance",balance)
        setaccountBalance(balance)
    }
    
  }
  const fetchPortfolio = async() =>{
    const result = await PortfolioAPI()
    console.log(result)
    setportfolio(result)
  }

  const roundDecimal = (numStr:string) => {
    const num = parseFloat(numStr);
    const decimalPlaces = numStr.split('.')[1]?.length || 0;
    
    if (decimalPlaces > 4) {
      return num.toFixed(4);
    } else {
      return num.toFixed(decimalPlaces);
    }
  };
  const ReturnBalance = () =>{
    if(address){
      return (
      <>
      {accountBalance != "" ?  roundDecimal(accountBalance.formatted)+" "+ accountBalance.symbol: <Spinner size='xs' />}
      </>)
    } else{
      return (<> N/A </>)
    }
  }

  const compareValue = (input:number,balance:number) =>{
    console.log("input",input,"balance",balance)
    return balance > input
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputToken);
    }, 500); // 0.5 seconds

    // Cleanup timeout if the effect is called again before the timeout completes
    return () => {
      clearTimeout(handler);
    };
  }, [inputToken]);
  useEffect(() => {      
    fetchQuote(chain1,chain2,debouncedValue)
  }, [chain1,chain2,data,debouncedValue])


  useEffect(() => {
    if(address){
      setrecepientAddress(address)
      fetchPortfolio()
      GetBalance()
    }
  }, [address])

  useEffect(() => {
    if(status === "success" && chain1){
      sendTransaction(data,chain1.id)
    }
  }, [data,status])

  return (
    <div className="BridgeRoot">
      <div className="BridgeApp">
        <div className="headline">Bridge {status}</div>

        <div className="from-chain">
          <div className="labels">
            <span className="tagline">From</span>
            <span className="balance">Balance:- <span><ReturnBalance /></span></span>
          </div>
          <button className="chain1-btn" onClick={() => ToggleDD(1)}>
            {chain1 && <img className="logo" src={chain1?.iconUrl} />}
            {chain1 !== null ? chain1.name : "Select Network"} 
            <img className="downArrow" src={downArrow} />
          </button>
          <input
            type="text"
            placeholder="0.0"
            className="inputToken"
            value={inputToken}
            onChange={handleInputChange1}
            onBlur={handleBlurEvent}
            onKeyPress={(e) => {
              if (!isNumberKey(e)) {
                e.preventDefault();
              }
            }}
          />
          <button className="max-btn" onClick={() =>{ 
            if(accountBalance !== ""){
              setinputToken(String(accountBalance.value))}
            }
            }>Max</button>
          <img src={ReverseChain} className="reverse-chain" onClick={reverseChain}/>
        </div>
        
        <div className="to-chain">
          <div className="labels">
            <span className="tagline">To</span>
          </div>
          <button className="chain2-btn" onClick={() => ToggleDD(2)}>
            {chain2 && <img className="logo" src={chain2?.iconUrl} />}
            {chain2 !== null ? chain2.name : "Select Network"}
            <img src={downArrow} className="downArrow" />
          </button>
          <input
            type="text"
            placeholder="0.0"
            className="outputToken"
            value={outputToken}
            readOnly
          />
        </div>

        <div className="review">
          {address === undefined ? (
            <>
             <button className=" review-btn" onClick={() => open()}> Connect Wallet</button> 
           
            </>
          ): chain1 && chain?.id !== chain1.id ? (
            <button className="review-btn" onClick={ () =>{
              switchChain({
                chainId:chain1.id
              })
            }}>Switch Network</button>
          ) : (<>
          <button className="review-btn"  disabled={!allvalueFilled} onClick={onSubmit}>{submitBtnText}</button>
          </>)}
          
        </div>

        {quoteData && (
          <QuoteSection
            address={recepientAddress}
            transactionTime={"1.2s"}
            fees={String(quoteData.fees)}
            chain1={chain1?.name}
          />
        )}
        
      </div>
      <SelectChainModalNew open={openChainPopup} setModal={changeModal} chain_1={chain1} chain_2={chain2} toselectChain={toSelectChain} portfolio={portfolio} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
      <TransactionPopup isOpen={openTransactionPopup} onOpen={onOpen} onClose={onClose} setModal={setTransactionModal} rejected={status === "error"} success={status === "success"} pending={status === "pending"} />
    </div>
  );
};

export default BridgeNew;
