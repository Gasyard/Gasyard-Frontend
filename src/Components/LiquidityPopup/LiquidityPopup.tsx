import React from "react";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { iconMap } from "../../Config/data";
import './LiquidityPopup.css'

type Props = {
    isOpen:boolean,
    onOpen:any,
    onClose:any
};

const LiquidityPopup = ({isOpen, onOpen, onClose}: Props) => {
  
  return (
    <div className="LiquidityPopupRoot">
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
           sx={{
            backgroundColor:"#FFFFFF",
            borderRadius:"26px",
            width:"434px",
            boxShadow:"0px 0px 0px 1px #09194821,0px 1px 2px 0px #12376914"
           }}
        >
          <ModalHeader borderBottom="1px solid #F1F2F4">Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingLeft={"0px"} paddingRight={"0px"}>
            <div className="BodyWrap">
              <div className="amountDisplay">
                <div className="nativeAmount">
                  0.1 <span className="nativeToken">ETH</span>
                </div>
                <div className="amountInUSD">$291.23</div>
              </div>
              <div className="chainDisplay">
                <img src={iconMap[1]} className="chainImg" />
                <div className="chainInfo">
                  ETH <span className="balance">Balance: 0.2</span>
                </div>
              </div>
              <div className="percentDisplay">
                <button>25%</button>
                <button>50%</button>
                <button>75%</button>
                <button>100%</button>
              </div>
              <div className="QuoteDisplay">
                <div className="quote_row">
                  <div className="quote_column col1">Points Earned</div>
                  <div className="quote_column col2"><span className="coin"></span>+400</div>
                </div>
                <div className="quote_row">
                  <div className="quote_column col1">Network</div>
                  <div className="quote_column col2">Base</div>
                </div>
                <div className="quote_row">
                  <div className="quote_column col1">Network Fee</div>
                  <div className="quote_column col2">
                    $0.12 USD
                  </div>
                </div>
              </div>
              <div className="SubmitBtn">
                <button>Deposit</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LiquidityPopup