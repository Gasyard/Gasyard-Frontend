import axios from "axios";

const isTestnet = process.env.REACT_APP_SERVER === "testnet"
const domain = isTestnet ? process.env.REACT_APP_BACKEND_API_TESTNET : process.env.REACT_APP_BACKEND_API
console.log(domain,process.env.REACT_APP_SERVER)
export const PortfolioAPI = async(address:any) =>{
    console.log("portfolio api called")
    try{
        // const url = `${domain}/api/portfolio/0x875C02095ABB53428aa56A59FE6C8E712F48C762`
        const url = `${domain}/api/portfolio/${address}`
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        return result
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
            const url = `${domain}/api/submit-tx`
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
        const url = `${domain}/api/list-transactions/${id}`
        const response = await axios.get(url)
        return response.data.results[0]
    }catch(err){
        console.log("Unexpected Error!",err)
        return null
    }
}

export const getListTransactions = async(page:number,inputAddress:`0x${string}`| string | null=null,chain1:number | null=null,chain2:number | null=null) => {
    try{
        var url = ""
        url = `${domain}/api/list-transactions?sortBy=updatedAt:desc&page=${page}&${inputAddress && `inputAddress=${inputAddress}`}&${chain1 && `inputChainID=${chain1}`}&${chain2 && `outputChainID=${chain2}`}`
        url = url.replace(/&null/g, "").replace("null","")
        const response = await axios.get(url)
        if(response.status === 400){
            console.log("400 error")
        }
        return response.data
    }catch(err){
        console.log("Unexpected Error!",err)
        return null
    }
}
