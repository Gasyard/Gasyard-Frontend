import { makeAutoObservable } from "mobx"
import { chainType } from "../types"


class FormStore{
    chain1:any = ""
    chain2:any = ""
    inputToken:any = ""
    outputToken:any = ""

    constructor(){
        makeAutoObservable(this)
    }
    setChain1= (data:any) =>{this.chain1 = data}
    setChain2 = (data:any) =>{this.chain2 = data}
    setInputToken = (data:any) =>{this.inputToken = data}
    setOuputToken = (data:any) =>{this.outputToken = data}
}

export default new FormStore()