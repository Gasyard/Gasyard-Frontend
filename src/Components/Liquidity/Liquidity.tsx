import React, { useEffect, useState } from "react";
import "./Liquidity.css";
import { iconMap } from "../../Config/data";
import LiquidityPopup from "../LiquidityPopup/LiquidityPopup";
import { useDisclosure } from "@chakra-ui/react";
import LiquidityWithdrawPopup from "../LiquidityPopup/LiquidityWithdrawPopup";
import { useChains } from "wagmi";
import { chainType } from "../../Config/types";
import { FetchLiquidityPoolBalance } from "../../Config/utils";

type Props = {};

const Liquidity = (props: Props) => {
  const Chains = useChains();
  console.log("Chains",Chains)
  const {  isOpen, onOpen, onClose} = useDisclosure();
  const [depositPopup, setdepositPopup] = useState(false);
  const [withdrawPopup, setwithdrawPopup] = useState(false);
  const [selectedChain, setselectedChain] = useState<chainType | null>(null);
  const [liquidityPoolBalance, setliquidityPoolBalance] = useState(null)
  const onClickDeposit = (chain:any) =>{
    setdepositPopup(true)
    setselectedChain(chain)
    onOpen()
  }
  const onClickWithdraw = (chain:any) =>{
    setwithdrawPopup(true)
    setselectedChain(chain)
    onOpen()
  }
  const onCloseDeposit = () =>{
    setdepositPopup(false)
    onClose()
  }
  const onCloseWithdraw = () =>{
    setwithdrawPopup(false)
    onClose()
  }

  const getBlanace = async(Chains:any) =>{
    const res = await FetchLiquidityPoolBalance(Chains);
    console.log(res)
    setliquidityPoolBalance(res)
  }

  useEffect(() => {
    getBlanace(Chains)
  }, [Chains])
  useEffect(() => {
    console.log("liquidityPoolBalance",liquidityPoolBalance)
  }, [liquidityPoolBalance])
  
  
  return (
    <div className="LiquidityRoot">
      <LiquidityPopup is_liquidtyModalOpen={isOpen && depositPopup} onOpen={onOpen} on_liquidtyModalClose={onCloseDeposit} chain={selectedChain} />
      <LiquidityWithdrawPopup is_liquidtyModalOpen={isOpen && withdrawPopup} onOpen={onOpen} on_liquidtyModalClose={onCloseWithdraw} chain={selectedChain}/>
      <div className="liquidity-table-container">
        <table>
          <thead>
            <tr>
              <th className="liquidity-table-title" colSpan={7}>Liquidity Pools <span className="TVL_text">TVL : $44,000.63</span></th>
            </tr>
            <tr>
              <th>Asset Name</th>
              <th>Status</th>
              <th>TVL</th>
              <th>1 Day Volume </th>
              <th>Your Liquidity</th>
              <th>Fees Earned </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Chains && Chains.map((ele) =>{
              return(<>
              <tr>
              <td>
                <div className="chain">
                  <img className="chain-logo" src={iconMap[ele.id]} />
                  {ele.name}
                </div>
              </td>
              <td>
                <div className="statusWrap">
                  <span className={`status success`}></span>
                  Success
                </div>
              </td>
              <td>{liquidityPoolBalance && liquidityPoolBalance[ele.id]} </td>
              <td>$1,00.43</td>
              <td>$1,00.43</td>
              <td>$1.43</td>
              <td>
                <div className="action_btn">
                  <button className="deposit-btn" onClick={() => onClickDeposit(ele)}>Deposit</button>
                  <button className="withdraw-btn" onClick={() => onClickWithdraw(ele)}>Withdraw</button>
                </div>
              </td>
            </tr>
              </>)
            })}
            {/* <tr>
              <td>
                <div className="chain">
                  <img className="chain-logo" src={iconMap[1]} />
                  Ethereum
                </div>
              </td>
              <td>
                <div className="statusWrap">
                  <span className={`status success`}></span>
                  Success
                </div>
              </td>
              <td>$1,002.43</td>
              <td>$1,00.43</td>
              <td>$1,00.43</td>
              <td>$1.43</td>
              <td>
                <div className="action_btn">
                  <button className="deposit-btn" onClick={onClickDeposit}>Deposit</button>
                  <button className="withdraw-btn" onClick={onClickWithdraw}>Withdraw</button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="chain">
                  <img className="chain-logo" src={iconMap[42161]} />
                  Arbitrum
                </div>
              </td>
              <td>
                <div className="statusWrap">
                  <span className={`status success`}></span>
                  Success
                </div>
              </td>
              <td>$1,002.43</td>
              <td>$1,00.43</td>
              <td>$1,00.43</td>
              <td>$1.43</td>
              <td>
                <div className="action_btn">
                  <button className="deposit-btn" onClick={onClickDeposit}>Deposit</button>
                  <button className="withdraw-btn" onClick={onClickWithdraw}>Withdraw</button>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Liquidity;
