import { ethers } from "ethers";
import { formatEther, parseEther } from 'ethers';
import Web3 from "web3";
import { LiquidityPoolBalance, NetworkConfigReturnType, PortfolioListReturnType } from "./types";
import { pool_abi } from "./abi";
import axios from "axios";

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

  const FetchUserLiquidityPoolBalance = async(networkConfigList:any,walletAddress:`0x${string}`) =>{
    var networkBalance:LiquidityPoolBalance = {};

    await Promise.all(
      networkConfigList.map(async (networkConfig:any) =>{
        try{
          const web3Instance = new Web3(networkConfig.rpcUrls.default.http[0]);
          const feedInstance = new web3Instance.eth.Contract(pool_abi, networkConfig.liquidityPool);
          const userbalance = await feedInstance.methods.balanceOf(walletAddress).call();
          const balanceBigInt = BigInt(userbalance)
          networkBalance[networkConfig.id] = {
              "balance":balanceBigInt,
              "name":networkConfig.name,
              "balanceinusd":convertEthToUsd(balanceBigInt,await getUSDAmount(networkConfig.nativeCurrency.symbol))
            }
        }catch(err){
          console.log("user err",err,networkConfig.name,networkConfig.id)
        }
      }))
      console.log("UsernetworkBalance",networkBalance)
      return networkBalance
  }
  const FetchLiquidityPoolBalance = async(networkConfigList:any) =>{
    var networkBalance:LiquidityPoolBalance = {};
    
    await Promise.all(
    networkConfigList.map(async (networkConfig:any) =>{
      try{
        const web3Instance = new Web3(networkConfig.rpcUrls.default.http[0]);
        const maxBalance = await web3Instance.eth.getBalance(networkConfig.liquidityPool);
        console.log("networkConfig",networkConfig.name,maxBalance,networkConfig.rpc)
        networkBalance[networkConfig.id] = {
          "balance":maxBalance,
          "name":networkConfig.name,
          "balanceinusd":convertEthToUsd(maxBalance,await getUSDAmount(networkConfig.nativeCurrency.symbol))
        }
      }catch(err){
        //networkBalance.push(parseEther("0"));
        console.log("err",err,networkConfig.name,networkConfig.id)
      }
      
    }))
    console.log("networkBalance",networkBalance)
    return networkBalance;
  }

  const FetchPortfolioBalance = async(networkConfigList:any,walletAddress:any) =>{
    let portfolioBalances:PortfolioListReturnType = {};

    console.log("FetchPortfolioBalance called!")
    await Promise.all(
      networkConfigList.map(async (networkConfig:any) =>{
        const web3Instance = new Web3(networkConfig.rpcUrls.default.http[0]);
        let userFolio;
        try {
            userFolio = await web3Instance.eth.getBalance(walletAddress);
        }catch{
            userFolio = BigInt(0);
        }
        portfolioBalances[networkConfig.id] =  {
          networkName: networkConfig.name,
          balance: Web3.utils.fromWei(userFolio, 'ether'),
          decimals: networkConfig.decimals
      };
      })
    )
    console.log("FetchPortfolioBalance value",portfolioBalances)
    return portfolioBalances;
  }

  const getUSDAmount = async(token:string) =>{
    if(token === "MOVE" || token === "MATIC" || token === "BERA") return 50;
    const url = `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${token.toUpperCase()}USDT`
    const res = await axios.get(url)
    return res.data.result.list[0].usdIndexPrice
  }

  function convertEthToUsd(ethBalanceWei:bigint, ethToUsdRate:number) {
    // Convert wei to ETH (using BigInt for precision)
    const weiPerEth = BigInt(1e18);
    const ethBalance = Number(ethBalanceWei) / Number(weiPerEth);

    // Calculate the USD value
    const usdValue = ethBalance * ethToUsdRate;

    // Return the USD value formatted to two decimal places
    return usdValue.toFixed(2);
}
  
export {
    convertEthToWeiAndBack,
    CompareValues,
    FetchLiquidityPoolBalance,
    FetchUserLiquidityPoolBalance,
    FetchPortfolioBalance
}