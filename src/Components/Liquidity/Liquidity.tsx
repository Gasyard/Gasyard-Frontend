import React from "react";
import "./Liquidity.css";
import { iconMap } from "../../Config/data";
import LiquidityPopup from "../LiquidityPopup/LiquidityPopup";
import { useDisclosure } from "@chakra-ui/react";

type Props = {};

const Liquidity = (props: Props) => {
  const {  isOpen, onOpen, onClose} = useDisclosure();
  const onClickDeposit = () =>{
    onOpen()
  }
  return (
    <div className="LiquidityRoot">
      <LiquidityPopup isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
            <tr>
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
                  <button className="withdraw-btn">Withdraw</button>
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
                  <button className="withdraw-btn">Withdraw</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Liquidity;
