import React, { useEffect, useState } from "react";
import "./Explorer.css";
import SearchIcon from "../../assets/search_logo.svg";
import arb_logo from "../../assets/arb_logo.svg";
import base_logo from "../../assets/chains/base.svg";
import scrollLogo from '../../assets/chains/scroll.svg'
import eth from "../../assets/coins/eth.svg";
import redirect_logo from "../../assets/redirect_grey.svg";
import copytext from "../../assets/copyText2.svg";
import { getListTransactions } from "../../Config/API/api";
import { ImageMapType2, TxObjectType } from "../../Config/types";
import { formatEther } from "viem";
import arrowLeft from "../../assets/arrow-left.svg";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {};

const imageUrl: ImageMapType2 = {
  42161: arb_logo,
  8453: base_logo,
  534352:scrollLogo
};

type TxObjectArrayType = TxObjectType[];
const Explorer = (props: Props) => {
  const [initailTxns, setInitailTxns] = useState<TxObjectArrayType | null>(null)
  const [transactions, settransactions] = useState<TxObjectArrayType | null>(
    null
  );
  const [pageNo, setpageNo] = useState(1);
  const [btn1disabled, setbtn1disabled] = useState(false);
  const [btn2disabled, setbtn2disabled] = useState(false);
  const [totalPages, settotalPages] = useState(1);
  const [inputAddress, setinputAddress] = useState("")

  const getData = async (pageNo: number) => {
    const data = await getListTransactions(pageNo);
    console.log("tnxobj", data);
    settransactions(data.results);
    setInitailTxns(data.results)
    settotalPages(data.totalPages);
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

  const onClickPrev = () => {
    if (pageNo > 1) {
      setpageNo(pageNo - 1);
    } else {
      setpageNo(totalPages);
    }
  };
  const onClickNext = () => {
    if (pageNo > totalPages) {
      setpageNo(1);
    } else {
      setpageNo(pageNo + 1);
    }
  };

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

  function filterObjectsByAddress(objects:TxObjectArrayType, address:string) {
    return objects.filter(obj => {
        const addressLowerCase = address.toLowerCase();
        return (
            (obj.inputTxHash && obj.inputTxHash.toLowerCase().includes(addressLowerCase)) ||
            (obj.outputTxHash && obj.outputTxHash.toLowerCase().includes(addressLowerCase)) ||
            (obj.inputAddress && obj.inputAddress.toLowerCase().includes(addressLowerCase)) ||
            (obj.outputAddress && obj.outputAddress.toLowerCase().includes(addressLowerCase))
        );
    });
}



  useEffect(() => {
    getData(pageNo);
  }, [pageNo]);

  useEffect(() => {
    if(transactions){
      if(inputAddress != ""){
      const filteredObjects = filterObjectsByAddress(transactions, inputAddress);
      settransactions(filteredObjects)
      }
      else{
        settransactions(initailTxns)
      }
    }
    
  }, [inputAddress])
  

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
      <div className="filter-container dflex-row">
        <div className="input-search">
          <img src={SearchIcon} />
          <input
            type="text"
            placeholder="Search by transaction hash or address"
            value={inputAddress}
            onChange={(e) => setinputAddress(e.target.value)}
          />
        </div>
        <div className="filters dflex-row">
          <div className="filter-chain1 dflex-row">
            Filter
            <Menu>
              <MenuButton
                as={Button}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "24px",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  textAlign: "left",
                  color:"#878794"
                }}
                rightIcon={<ChevronDownIcon />}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="filter-chain1 dflex-row">
            To
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "24px",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  textAlign: "left",
                  color:"#878794"
                }}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
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
            {transactions !== null ? (
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
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Spinner size="md" />
                </td>
              </tr>
            )}

            <tr>
              <td colSpan={6}>
                <div className="table-footer">
                  <button
                    className="previous btns"
                    onClick={onClickPrev}
                    disabled={pageNo < 1}
                  >
                    <img src={arrowLeft} className="prev-arrow" />
                    Previous
                  </button>
                  <div className="pagination"></div>
                  <button
                    className="next btns"
                    onClick={onClickNext}
                    disabled={pageNo > totalPages}
                  >
                    Next <img src={arrowLeft} className="next-arrow" />
                  </button>
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
