import axios from "axios";

export const PortfolioAPI = async(address:any) =>{
    console.log("portfolio api called")
    try{
        // const url = `https://api.gasyard.fi/api/portfolio/0x875C02095ABB53428aa56A59FE6C8E712F48C762`
        const url = `https://api.gasyard.fi/api/portfolio/${address}`
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        return result.responseJson
    }
    catch(Err){
        console.log("Unexpected Error! " ,Err)
        return null
    }
}

export const sendTransaction = async(hash:`0x${string}` | undefined,inputNetwork:number) => {
    console.log('send transaction called')
    try{
        if(hash){
            const url = 'https://api.gasyard.fi/api/submit-tx' 
            const data = {
                    "transactionHash":hash,
                    "inputNetwork":inputNetwork
            }
            
            const res = await axios.post(url,data)
            console.log(res)
            return res.data
        }
    }catch(err){
        console.log(err)
        return {"status":400,"msg":err}
    }
    
}

export const fetchTransactionObject = async(id:string) =>{
    try{
        const url = `https://api.gasyard.fi/api/list-transactions/${id}`
        const response = await axios.get(url)
        return response.data[0]
    }catch(err){
        console.log("Unexpected Error!",err)
        return null
    }
}