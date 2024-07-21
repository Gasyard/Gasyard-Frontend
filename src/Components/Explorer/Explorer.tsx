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
import { explorerMapType, ImageMapType2, TxObjectType } from "../../Config/types";
import { formatEther } from "viem";
import arrowLeft from "../../assets/arrow-left.svg";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useChains } from "wagmi";


type Props = {};

const imageUrl: ImageMapType2 = {
  42161: arb_logo,
  8453: base_logo,
  534352:scrollLogo
};

const explorerMap:explorerMapType = {
  42161: "https://arbiscan.io/address/",
  8453: "https://basescan.org/address/",
  534352:"https://scrollscan.com/address/"
}

type chains_type = {
  id:number,
  name:string
}
type TxObjectArrayType = TxObjectType[];


const Explorer = (props: Props) => {
  const [initailTxns, setInitailTxns] = useState<TxObjectArrayType | null>(null)
  const [transactions, settransactions] = useState<TxObjectArrayType | null>(
    null
  );
  const [pageNo, setpageNo] = useState(1);
  const [btn1disabled, setbtn1disabled] = useState(false);
  const [btn2disabled, setbtn2disabled] = useState(false);
  const [totalPages, settotalPages] = useState(0);
  const [inputAddress, setinputAddress] = useState<`0x${string}`| "" | string>("")
  const [debouncedValue, setDebouncedValue] = useState<`0x${string}` | string>(inputAddress);
  const [chain1, setchain1] = useState<chains_type | null>(null)
  const [chain2, setchain2] = useState<chains_type | null>(null)

  const Chains = useChains()

  const getData = async (pageNo: number) => {
    const data = await getListTransactions(pageNo);
    console.log("tnxobj", data);
    settransactions(data.results);
    setInitailTxns(data.results)
    settotalPages(data.totalPages);
  };

  const getFilteredData = async(page:number,inputAddress:`0x${string}`| "" | string,chain1:chains_type|null,chain2:chains_type|null) =>{
    const response = await getListTransactions(page,inputAddress === "" ? null : inputAddress, chain1 && chain1.id ? chain1.id : null,chain2 && chain2.id ? chain2.id : null)
    console.log(response)
    if(response && response.results){
      settransactions(null)
      setTimeout(() => {
        settransactions(response.results)
        settotalPages(response.totalPages);
      }, 500);
    }else{
      settransactions([])
      settotalPages(0)
    }
    
  }

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
    setpageNo(pageNo-1)
  };
  const onClickNext = () => {
    setpageNo(pageNo+1)
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
  };

  function filterObjectsByChain(objects:TxObjectArrayType, id:number,chain_no:number) {
    if(chain_no === 1){
    return objects.filter(obj => {
        return (
            (obj.inputChainID && obj.inputChainID === id) 
        );
    });
  }else{
    return objects.filter(obj => {
      return (
          (obj.outputChainID && obj.outputChainID === id) 
      );
  });
  }
  };

  const onSelectChain = (chain_no:number,chain_obj:chains_type) =>{
    if(chain_no === 1){
      setchain1(chain_obj)
      // initailTxns && settransactions(filterObjectsByChain(initailTxns,chain_obj.id,1))
    }else{
      setchain2(chain_obj)
      // initailTxns && settransactions(filterObjectsByChain(initailTxns,chain_obj.id,2))
    }
  }

  const redirectToExplorer = (id:number,hash:any) =>{
    const url = explorerMap[id]+hash
    window.open(url, '_blank');
  }


  // useEffect(() => {
  //   getFilteredData(1,"",null,null)
  // }, [])
  

  useEffect(() => {
    if(inputAddress || chain1 || chain2){
      getFilteredData(pageNo,inputAddress,chain1,chain2)
    }
    else{
      getFilteredData(pageNo,"",null,null)
    }
  }, [pageNo]);

  useEffect(() => {
    console.log("debouncedValue",debouncedValue)
    if(debouncedValue || chain1 || chain2){
      console.log("inside")
      getFilteredData(0,inputAddress,chain1,chain2)
    }else{
      console.log("inside2",initailTxns)
      getFilteredData(1,"",null,null)
    }
  }, [debouncedValue,chain1,chain2])

  useEffect(() => {

    const handler = setTimeout(() => {
      console.log("input value set",inputAddress)
      setDebouncedValue(inputAddress);
    }, 1000); // 1 seconds

    // Cleanup timeout if the effect is called again before the timeout completes
    return () => {
      clearTimeout(handler);
    };

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
                disabled
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
                {chain1 ? chain1.name :"All Chains"}
              </MenuButton>
              <MenuList>
                <MenuItem key={0} onClick={() => setchain1(null)}>All Chains</MenuItem>
                {Chains.map((chain) =>{
                  return(<MenuItem key={chain.id} onClick={() => onSelectChain(1,{id:chain.id,name:chain.name})}>{chain.name}</MenuItem>)
                })}
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
                disabled={true}
              >
                {chain2 ? chain2.name :"All Chains"}
              </MenuButton>
              <MenuList>
              <MenuItem key={0} onClick={() => setchain2(null)}>All Chains</MenuItem>
              {Chains.map((chain) =>{
                  return(<MenuItem key={chain.id} onClick={() => onSelectChain(2,{id:chain.id,name:chain.name})}>{chain.name}</MenuItem>)
                })}
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
            {transactions ? (
              transactions.map((item, index) => (
                <tr>
                  <td>
                    <div className="dflex-row hash">
                      {shortenAddress(item.managerHash)} 
                      <Tooltip label='Copy' fontSize='sm' bg="#E4E7EC" color="#444" placement='bottom'>
                      <img src={copytext} onClick={() => item.managerHash && navigator.clipboard.writeText(item.managerHash)} />
                      </Tooltip>
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
                      <img src={redirect_logo} onClick={() => redirectToExplorer(item.outputChainID,item.outputAddress)} />
                    </div>
                  </td>
                  <td>
                    <div className="dflex-row token">
                      Chain:{" "}
                      <img src={imageUrl[item.inputChainID]} className="logo" />
                      {formatToken(formatEther(item.inputChainAmount))} ETH
                      {/* <img src={redirect_logo} /> */}
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
                      {/* <img src={redirect_logo} /> */}
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
                    disabled={!(pageNo > 1)}
                  >
                    <img src={arrowLeft} className="prev-arrow" />
                    Previous
                  </button>
                  <div className="pagination"></div>
                  <button
                    className="next btns"
                    onClick={onClickNext}
                    disabled={!(totalPages > pageNo)}
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
