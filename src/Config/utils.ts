import { ethers } from "ethers";
import { formatEther, parseEther } from 'ethers';
import Web3 from "web3";

const convertEthToWeiAndBack = (ethString:string) => {
    try {
      const weiValue = parseEther(ethString);
      console.log("weiValue",weiValue)

      const ethValue = formatEther(weiValue);
      console.log("ethValue",ethValue)


      const roundedEthValue = roundDecimal(ethValue);
      console.log("roundedEthValue",roundedEthValue)
      return roundedEthValue.toString();
    } catch (error) {
      console.error("convertEthToWeiAndBack: Invalid ETH value",ethString);
      return null;
    }
  };
  const roundDecimal = (numStr:string) => {
      const num = parseFloat(numStr);
    const decimalPlaces = numStr.split('.')[1]?.length || 0;
    
    if (decimalPlaces > 4) {
      return num.toFixed(4);
    } else {
      return num.toFixed(decimalPlaces);
    }
    
    
  };
  const CompareValues = (input: string, balance: string) => {
    //console.log("bigint ",parseEther(balance),parseEther(input).valueOf())
    try{
      const inp = parseFloat(input) * 1e18
      const out = parseFloat(balance) * 1e18
      const to_subtract = parseFloat("0.0001") * 1e18
      const new_out = out-to_subtract;
      console.log("CompareValues",new_out,inp)
      return new_out >= inp
    }
    catch(err){
      console.group("CompareValues err",err)
      return false
    }
    
  };

  // const FetchLiquidityPoolBalance = async(networkConfig:any) =>{
  //   const web3Instance = new Web3(networkConfig.rpc);
  //   const maxBalance = await web3Instance.eth.getBalance(networkConfig.liquidityPool);
  //   return maxBalance;
  // }
  const FetchLiquidityPoolBalance = async(networkConfigList:any) =>{
    var networkBalance:any = {};
    
    networkConfigList.map(async (networkConfig:any) =>{
      try{
        const web3Instance = new Web3(networkConfig.rpc);
        const maxBalance = await web3Instance.eth.getBalance(networkConfig.liquidityPool);
        console.log("networkConfig",networkConfig.name,maxBalance)
        networkBalance[networkConfig.id] = maxBalance
      }catch(err){
        //networkBalance.push(parseEther("0"));
        console.log("err",err,networkConfig.name,networkConfig.id)
      }
      
    })
    console.log("networkBalance",networkBalance)
    return networkBalance;
  }

  const get_wei = (val:string) =>{

  }
  
export {
    convertEthToWeiAndBack,
    CompareValues,
    FetchLiquidityPoolBalance
}