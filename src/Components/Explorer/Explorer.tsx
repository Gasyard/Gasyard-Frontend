import React, { useEffect, useState } from "react";
import "./Explorer.css";
import SearchIcon from "../../assets/search_logo.svg";
import arb_logo from "../../assets/arb_logo.svg";
import base_logo from "../../assets/chains/base.svg";
import eth from "../../assets/coins/eth.svg";
import redirect_logo from "../../assets/redirect_grey.svg";
import copytext from "../../assets/copyText2.svg";
import { getListTransactions } from "../../Config/API/api";
import { ImageMapType2, TxObjectType } from "../../Config/types";
import { formatEther } from "viem";
import arrowLeft from '../../assets/arrow-left.svg'

type Props = {};

const imageUrl: ImageMapType2 = {
  42161: arb_logo,
  8453: base_logo,
};

type TxObjectArrayType = TxObjectType[];
const Explorer = (props: Props) => {
  const [transactions, settransactions] = useState<TxObjectArrayType | null>(null);
  const [pageNo, setpageNo] = useState(1)
  const [btn1disabled, setbtn1disabled] = useState(false)
  const [btn2disabled, setbtn2disabled] = useState(false)
  const [totalPages, settotalPages] = useState(1)

  const getData = async (pageNo:number) => {
    const data = await getListTransactions(pageNo);
    console.log("tnxobj", data);
    settransactions(data.results);
    settotalPages(data.totalPages)
  };

  const shortenAddress = (
    address: string | null,
    startLength = 8,
    endLength = 8
  ): string => {
    if (address) {
      if (address.length <= startLength + endLength) {
        return address;
      }
      return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }
    return "";
  };

  const onClickPrev = () =>{
    if(pageNo > 1){
        setpageNo(pageNo-1)
    }else{
        setpageNo(totalPages)
    }
  }
  const onClickNext = () =>{
    if(pageNo > totalPages){
        setpageNo(1)
    }else{
        setpageNo(pageNo+1)
    }
    
  }

  const formatToken = (numStr: string) => {
    if (parseFloat(numStr)) {
      const num = parseFloat(numStr);
      const decimalPlaces = numStr.split(".")[1]?.length || 0;
      if (decimalPlaces > 4) {
        return num.toFixed(4).toString();
      } else {
        return num.toFixed(decimalPlaces).toString();
      }
    }
    return numStr;
  };

  useEffect(() => {
    getData(pageNo);
  }, [pageNo]);

  return (
    <div className="ExplorerApp">
      {/* <div className="content-section">
        <div className="content">
            <div className="title">Yard Explorer</div>
            <div className="subtitle">Track all your transactions at one place</div>
            <div className="input-search">
                <img src={SearchIcon}/>
            <input type="text" placeholder='Search by transaction hash or address' />
            </div>
        </div>
        </div> */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Settlement Hash</th>
              <th>Status</th>
              <th>To Address</th>
              <th>From </th>
              <th>To</th>
              <th>Time </th>
            </tr>
          </thead>
          <tbody>
            {transactions !== null &&
              transactions.map((item, index) => (
                <tr>
                  <td>
                    <div className="dflex-row hash">
                      {shortenAddress(item.inputAddress)} <img src={copytext} />
                    </div>
                  </td>
                  <td>
                    <div className="statusWrap">
                      <span className={`status ${item.status}`}></span>
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <div className="dflex-row address">
                      {shortenAddress(item.outputAddress)}{" "}
                      <img src={redirect_logo} />
                    </div>
                  </td>
                  <td>
                    <div className="dflex-row token">
                      Token:{" "}
                      <img src={imageUrl[item.inputChainID]} className="logo" />
                      {formatToken(formatEther(item.inputChainAmount))} ETH
                      <img src={redirect_logo} />
                    </div>
                  </td>

                  <td>
                    <div className="dflex-row chain">
                      Chain:{" "}
                      <img
                        src={imageUrl[item.outputChainID]}
                        className="logo"
                      />
                      {formatToken(formatEther(item.outputChainAmount))} ETH
                      <img src={redirect_logo} />
                    </div>
                  </td>
                  <td>{item.updatedAt}</td>
                </tr>
              ))}

              <tr>
                <td colSpan={6}>
                    <div className="table-footer">
                    <button className="previous btns" onClick={onClickPrev} disabled={pageNo < 1}><img src={arrowLeft} className="prev-arrow" />Previous</button>
                    <div className="pagination">

                    </div>
                    <button className="next btns" onClick={onClickNext} disabled={pageNo > totalPages}>Next <img src={arrowLeft} className="next-arrow"/></button>
                    </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Explorer;
