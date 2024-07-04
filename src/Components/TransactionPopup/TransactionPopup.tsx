import React from 'react'
import { Button, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stat, StatHelpText, StatLabel, StatNumber, useDisclosure } from "@chakra-ui/react";
import CloseBtn from '../../assets/CloseIcon.svg'
import clock from '../../assets/clock.svg'
import './TransactionPopup.css'
import ChainCoin from '../../assets/chain_coin.svg'
import arblogo from '../../assets/arb_logo.svg'
import darrow from '../../assets/darrow.svg'
import redirectLogo from '../../assets/redirect.svg'

type Props = {
    isOpen?:any
    onOpen?:any 
    onClose?:any 
}

const TransactionPopup = ({isOpen,onOpen, onClose}: Props) => {
  return (
    <div className="TransactionPopupRoot">
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
          size={"md"}
          
          
        >
          <ModalOverlay />
          <ModalContent borderRadius="20px" boxShadow="0px 1px 2px 0px #12376914;">
            <ModalHeader>
                <div className="header">
                    Transaction Details
                    <img src={CloseBtn} onClick={onClose}/>
                   
                </div>
            </ModalHeader>

            <ModalBody>
                <div className="loaderDiv">
                    <div className="spinner"></div>
                    <div className='confirm_text'>
                        <img src={clock} className='clock'/>
                        Confirm in Wallet</div>
                </div>
                <div className="reviewChains">
                    <div className="chain chain1">
                        <div className="chainCoinDiv">
                            <img src={ChainCoin} className='chainCoin' alt="coin"/>
                            <img src={arblogo} className="chainlogo" alt="" />
                        </div>
                        <div className="chainInfo">
                            <div className="token_amount">0.1 ETH</div>
                            <div className="chain_network">Arbitrum One</div>
                        </div>
                    </div>
                    <img src={darrow} className='darrow'/>
                    <div className="chain chain2">
                        <div className="chainCoinDiv">
                                <img src={ChainCoin} className='chainCoin' alt="coin"/>
                                <img src={arblogo} className="chainlogo" alt="" />
                            </div>
                            <div className="chainInfo">
                                <div className="token_amount">0.09985 ETH</div>
                                <div className="chain_network">Base</div>
                            </div>
                    </div>

                    
                </div>
                <div className="redirectSection">
                        View on Explorer
                        <img src={redirectLogo} />                    
                    </div>
            
            </ModalBody>
            
          </ModalContent>
        </Modal>
    </div>
  )
}

export default TransactionPopup