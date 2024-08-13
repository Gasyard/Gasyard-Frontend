import React, { useEffect, useState } from "react";
import "./Liquidity.css";
import { iconMap } from "../../Config/data";
import LiquidityPopup from "../LiquidityPopup/LiquidityPopup";
import { useDisclosure } from "@chakra-ui/react";
import LiquidityWithdrawPopup from "../LiquidityPopup/LiquidityWithdrawPopup";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import {
  chainType,
  LiquidityPoolBalance,
  NetworkConfigReturnType,
  PortfolioListReturnType,
  TotalChainVolume,
} from "../../Config/types";
import {
  FetchLiquidityPoolBalance,
  FetchPortfolioBalance,
  FetchUserLiquidityPoolBalance,
} from "../../Config/utils";
import { formatEther, formatUnits, parseEther } from "viem";

type Props = {};

const Liquidity = (props: Props) => {
  const Chains = useChains();
  console.log("Chains", Chains);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [depositPopup, setdepositPopup] = useState(false);
  const [withdrawPopup, setwithdrawPopup] = useState(false);
  const [selectedChain, setselectedChain] = useState<chainType | null>(null);
  const [totalChainVolume, settotalChainVolume] =
    useState<TotalChainVolume | null>(null);
  const [liquidityPoolBalance, setliquidityPoolBalance] =
    useState<LiquidityPoolBalance | null>(null);
  const [userLiquidityPoolBalance, setuserLiquidityPoolBalance] =
    useState<LiquidityPoolBalance | null>(null);
  const [portfolio, setportfolio] = useState<PortfolioListReturnType | null>(
    null
  );
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const onClickDeposit = (chain_: any) => {
    setdepositPopup(true);
    setselectedChain(chain_);
    onOpen();
    getBlanace(Chains);
    if (address) {
      getUserLiquidity(Chains, address);
    }
  };
  const onClickWithdraw = (chain: any) => {
    setwithdrawPopup(true);
    setselectedChain(chain);
    onOpen();
  };
  const onCloseDeposit = () => {
    setdepositPopup(false);
    onClose();
  };
  const onCloseWithdraw = () => {
    setwithdrawPopup(false);
    onClose();
  };

  const fetchPortfolio = async (address: any) => {
    // const result = await PortfolioAPI(address);
    const result = await FetchPortfolioBalance(Chains, address);
    console.log("portfolio", result);
    setportfolio(result);
    //setAccountBalance(result);
  };
  const getBlanace = async (Chains: any) => {
    const res = await FetchLiquidityPoolBalance(Chains);
    console.log(res);
    setliquidityPoolBalance(res);
  };

  const getUserLiquidity = async (
    Chains: any,
    walletAddress: `0x${string}`
  ) => {
    const res = await FetchUserLiquidityPoolBalance(Chains, walletAddress);
    setuserLiquidityPoolBalance(res);
  };
  const formatToken = (numStr: string) => {
    if (parseFloat(numStr)) {
      const num = parseFloat(numStr);
      const decimalPlaces = numStr.split(".")[1]?.length || 0;
      if (decimalPlaces > 6) {
        return num.toFixed(6).toString();
      } else {
        return num.toFixed(decimalPlaces).toString();
      }
    }
    return numStr;
  };

  const getTotalChainVolume = async (walletAddress: `0x${string}`) => {
    const isTestnet = process.env.REACT_APP_SERVER === "testnet";
    const domain = isTestnet
      ? process.env.REACT_APP_BACKEND_API_TESTNET
      : process.env.REACT_APP_BACKEND_API;
    console.log(
      "domain",
      domain,
      process.env.REACT_APP_BACKEND_API_TESTNET,
      process.env.REACT_APP_BACKEND_API
    );
    const url = `${domain}/api/pools/${walletAddress}`;

    const response = await fetch(url);

    if (response.status === 400 || response.status === 500) {
      const result = await response.json();
      console.log(result);
    } else {
      const result = await response.json();
      console.log(result);
      settotalChainVolume(result);
    }
  };

  const totalVolumeLocked =
    liquidityPoolBalance &&
    Object.values(liquidityPoolBalance).reduce(
      (acc, obj) => acc + parseInt(obj.balanceinusd),
      10
    );

    const fetchAllBalance = () =>{
      if(address){
        getUserLiquidity(Chains, address);
        getTotalChainVolume(address);
        fetchPortfolio(address);
      }
      
    }
  useEffect(() => {
    if (Chains) {
      getBlanace(Chains);
      //getUserLiquidity(Chains)
      if (address) {
        console.log("hbxhbhxbhbxh");
        getUserLiquidity(Chains, address);
        getTotalChainVolume(address);
        
      }
    }
  }, [Chains, address]);

  useEffect(() => {
    console.log(
      "liquidityPoolBalance",
      liquidityPoolBalance,
      liquidityPoolBalance && liquidityPoolBalance[2810]
    );
  }, [liquidityPoolBalance]);

  useEffect(() => {
    console.log("userliquidityPoolBalance", userLiquidityPoolBalance);
  }, [userLiquidityPoolBalance]);

  useEffect(() => {
    if (address) {
      fetchPortfolio(address);
    }
  }, [address]);

  return (
    <div className="LiquidityRoot">
      <LiquidityPopup
        is_liquidtyModalOpen={isOpen && depositPopup}
        onOpen={onOpen}
        on_liquidtyModalClose={onCloseDeposit}
        chain={selectedChain}
        balance={
          portfolio && selectedChain
            ? portfolio[selectedChain.id].balance
            : "N/A"
        }
        fetchAllBalance={fetchAllBalance}
      />
      <LiquidityWithdrawPopup
        is_liquidtyModalOpen={isOpen && withdrawPopup}
        onOpen={onOpen}
        on_liquidtyModalClose={onCloseWithdraw}
        chain={selectedChain}
        balance={
          userLiquidityPoolBalance && selectedChain
            ? userLiquidityPoolBalance[selectedChain.id].balance
            : "N/A"
        }
        balanceinUSD={
          userLiquidityPoolBalance && selectedChain
            ? userLiquidityPoolBalance[selectedChain.id].balanceinusd
            : "N/A"
        }
        fetchAllBalance={fetchAllBalance}
        
      />
      <div className="liquidity-table-container">
        <table>
          <thead>
            <tr>
              <th className="liquidity-table-title" colSpan={7}>
                Liquidity Pools{" "}
                <span className="TVL_text">TVL : ${totalVolumeLocked}</span>
              </th>
            </tr>
            <tr>
              <th>Asset Name</th>
              <th>Status</th>
              <th>TVL</th>
              <th>Total Volume </th>
              <th>Your Liquidity</th>
              <th>Fees Earned </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Chains &&
              liquidityPoolBalance &&
              Chains.map((ele) => {
                return (
                  <>
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
                          Active
                        </div>
                      </td>
                      <td>
                        <div className="showAmount">
                          <div className="amountinETH">
                          {liquidityPoolBalance &&
                          liquidityPoolBalance[ele.id] &&
                          `${formatToken(formatEther(liquidityPoolBalance[ele.id].balance))} ${ele.nativeCurrency.symbol}`}
                          </div>
                          <div className="amountinusd">
                              {liquidityPoolBalance &&
                              liquidityPoolBalance[ele.id] &&
                              `(~ $${liquidityPoolBalance[ele.id].balanceinusd})`}{" "}
                          </div>
                        </div>
                        

                      </td>
                      {/* formatUnits(liquidityPoolBalance[ele.id].balance */}
                      <td>
                        {totalChainVolume &&
                          `$${totalChainVolume[ele.id].totalVolume}`}
                      </td>
                      <td>
                      <div className="showAmount">
                        <div className="amountinETH">
                        {userLiquidityPoolBalance
                          ? userLiquidityPoolBalance[ele.id] &&
                            `${formatToken(formatEther(userLiquidityPoolBalance[ele.id].balance))} ${ele.nativeCurrency.symbol}`
                          : "N/A"}
                        </div>
                        <div className="amountinusd">
                        {userLiquidityPoolBalance
                          ? userLiquidityPoolBalance[ele.id] &&
                            `$${userLiquidityPoolBalance[ele.id].balanceinusd}`
                          : "N/A"}

                        </div>
                      </div>
                        
                      </td>
                      <td>$0</td>
                      <td>
                        <div className="action_btn">
                          <button
                            className="deposit-btn"
                            disabled={address === undefined}
                            onClick={() => onClickDeposit(ele)}
                          >
                            Deposit
                          </button>
                          <button
                            className="withdraw-btn"
                            disabled={address === undefined}
                            onClick={() => onClickWithdraw(ele)}
                          >
                            Withdraw
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
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
