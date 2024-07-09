import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import CloseBtn from "../../assets/CloseIcon.svg";
import clock from "../../assets/clock.svg";
import "./TransactionPopup.css";
import ChainCoin from "../../assets/chain_coin.svg";
import arblogo from "../../assets/arb_logo.svg";
import darrow from "../../assets/darrow.svg";
import redirectLogo from "../../assets/redirect.svg";
import retry from "../../assets/retry.svg";
import success_animation from "../../assets/animations/success-animation.json";
import on_going_trxn_animation from "../../assets/animations/on-going-txn.json";
import rejected_animation from "../../assets/animations/rejected-animation.json";
import pending_animation from "../../assets/animations/pending-animation.json"

import Lottie from "lottie-react";
import { observer } from "mobx-react";
import FormStore from "../../Config/Store/FormStore";

type Props = {
  isOpen?: any;
  onOpen?: any;
  onClose?: any;
  setModal?: any;
  rejected?: boolean;
  pending?:boolean;
  success?:boolean
  onSubmit?:any
};

const TransactionPopup = observer(({ isOpen, onOpen, onClose, setModal, rejected, success, pending,onSubmit }: Props) => {
  const [is_rejected, setis_rejected] = useState(true);
  const [is_successed, setis_successed] = useState(false);

  const onCloseModal = () => {
    // onClose()
    setModal(false);
    onClose();
  };
  return (
    <div className="TransactionPopupRoot">
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"md"}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="20px"
          boxShadow="0px 1px 2px 0px #12376914;"
        >
          <ModalHeader>
            <div className="header">
              {rejected ? "User Rejected" : "Transaction Details"}
              <img src={CloseBtn} onClick={onCloseModal} />
            </div>
          </ModalHeader>

          <ModalBody>
            <div className={`success_body ${rejected ? "hideDiv" : ""}`}>
              <div className="loaderDiv">
                {success ? (
                  <>
                    <div className="transaction_details">Bridge Successful</div>
                    <Lottie
                      animationData={success_animation}
                      loop={true}
                      style={{ height: "150px", width: "150px" }}
                    />
                  </>
                ) : (
                  <>
                    <div className="transaction_details">
                      Waiting for user to confirm transaction
                      {/* <span className="chain_name">Arbitrum one</span> */}
                    </div>
                    <Lottie
                      animationData={pending_animation}
                      loop={true}
                      style={{ height: "150px", width: "150px" }}
                    />
                  </>
                )}
              </div>
              <div className="reviewChains">
                <div className="chain chain1">
                  <div className="chainCoinDiv">
                    <img src={FormStore.chain1 && FormStore.chain1.iconUrl} className="chainCoin" alt="coin" />
                    {/* <img src={arblogo} className="chainlogo" alt="" /> */}
                  </div>
                  <div className="chainInfo">
                    <div className="token_amount">{FormStore.inputToken} ETH</div>
                    <div className="chain_network">{FormStore.chain1 && FormStore.chain1.name}</div>
                  </div>
                </div>
                <img src={darrow} className="darrow" />
                <div className="chain chain2">
                  <div className="chainCoinDiv">
                    <img src={FormStore.chain2 && FormStore.chain2.iconUrl} className="chainCoin" alt="coin" />
                    {/* <img src={arblogo} className="chainlogo" alt="" /> */}
                  </div>
                  <div className="chainInfo">
                    <div className="token_amount">{FormStore.outputToken} ETH</div>
                    <div className="chain_network">{FormStore.chain2 && FormStore.chain2.name}</div>
                  </div>
                </div>
              </div>
              {/* <div className="redirectSection" onClick={() => setis_successed(!is_successed)}>
                View on Explorer
                <img src={redirectLogo} onClick={() => setis_successed(!is_successed)}/>
              </div> */}
            </div>
            <div className={`rejected_body ${!rejected ? "hideDiv" : ""}`}>
              <div className="loaderDiv">
                <Lottie
                  animationData={rejected_animation}
                  loop={true}
                  style={{ height: "150px", width: "150px" }}
                />

                <div className="rejection_text">
                  User Rejected transaction in Wallet
                </div>

                <div className="retry" onClick={() => setis_rejected(false)}>
                  Retry{" "}
                  <img
                    src={retry}
                    alt="retry"
                    onClick={onSubmit}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
});

export default TransactionPopup;
