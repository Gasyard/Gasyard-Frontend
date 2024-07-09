import { ethers } from "ethers";
import { formatEther, parseEther } from 'ethers';

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

  const get_wei = (val:string) =>{

  }
  
export {
    convertEthToWeiAndBack
}