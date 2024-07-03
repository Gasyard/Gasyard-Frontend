import axios from "axios";

export const PortfolioAPI = async() =>{
    console.log("portfolio api called")
    try{
        const url = 'https://gasyardbackend-production.up.railway.app/api/portfolio/0x875C02095ABB53428aa56A59FE6C8E712F48C762'
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        return result.sortedTokens
    }
    catch(Err){
        console.log("Unexpected Error! " ,Err)
        return null
    }
}

export const sendTransaction = async(hash:`0x${string}` | undefined,inputNetwork:number) => {
    console.log('send transaction called')
    if(hash){
        const url = 'https://gasyardbackend-production.up.railway.app/api/submit-tx' 
        const data = {
            
                "transactionHash":hash,
                "inputNetwork":inputNetwork
            
        }
        
        const res = await axios.post(url,data)
        console.log(res)
    }
}