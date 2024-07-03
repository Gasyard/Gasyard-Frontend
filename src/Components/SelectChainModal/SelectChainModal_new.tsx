import { Button, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stat, StatHelpText, StatLabel, StatNumber, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useChains } from "wagmi";
import { chainType } from "../../Config/types";
import "./SelectChainModal.css"
import SearchIcon from '../../assets/search.svg'
type Props = {
    open:any
    setModal:any
    chain_1:any
    chain_2:any
    toselectChain:any
    portfolio:any
    isOpen?:any
    onOpen?:any
     onClose?:any
}

function SelectChainModalNew({open,isOpen,onOpen, onClose,setModal,chain_1,chain_2,toselectChain,portfolio}: Props) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const Chains = useChains()

    const [chainList, setchainList] = useState<readonly chainType[]>(Chains)
    const onChainSelect = (chain:any) =>{
        setModal(false,chain)
        onClose()
    }
    const handleInputChange = (e:any) =>{
        var value = e.target.value
        if(value === ""){
            setchainList(Chains)
        }else{
            var newChain = chainList.filter(e => e.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
            setchainList(newChain)
        }
        
    }
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
            <div className='search-chain'>
            
                    <input type="text"  placeholder='Search by name' onChange={handleInputChange}/>
                    
                </div>
                
            </ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
            {chainList.map((chain)=>{
                    var key = chain.name
                    
                    if(toselectChain === 2 && chain.id === chain_1.id){
                        return("")
                    }
                    return(
                        <div className="chains" key={chain.id} onClick={() => onChainSelect(chain)}>
                            <img className="chain-img" src={chain.iconUrl}/>
                            <div className='chain-info'>
                                <div className="chain-name">{chain.name}</div>
                                <div className="chain-token">{chain.nativeCurrency.symbol}</div>
                            </div>
                            <div className="chain-balance">
                                {portfolio && portfolio[key.toLowerCase()] && portfolio[key.toLowerCase()].balance}
                            </div>
                            
                        </div>
                    )
                })}
                
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default SelectChainModalNew