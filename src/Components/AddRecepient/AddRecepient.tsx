import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FocusLock,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import addAddress from "../../assets/addAddress.svg";
import GreenTick from "../../assets/green-tick.svg";

type Props = {
  setrecepientAddress: any;
  recepientAddress: any;
};

const AddRecepient = ({ setrecepientAddress, recepientAddress }: Props) => {
  const [recepientAddressError, setrecepientAddressError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addressInput, setaddressInput] = useState("");
  const onChangeRecpAddress = (e: any) => {
    var value = e.target.value;
    if (!value.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      setrecepientAddressError("address must be a EVM WalletAddress");
    } else {
      setrecepientAddressError("");
    }
    setaddressInput(value);
  };

  const onSave = () => {
    if(recepientAddressError === ""){
        setrecepientAddress(addressInput);
        setaddressInput("")
        onClose();
    }else{
        setrecepientAddressError("Please enter the valid address.")
    }
    
  };

  const shortenAddress = (
    address: string | null,
    startLength = 8,
    endLength = 8
  ): string => {
    if (address) {
      if (address.length <= startLength + endLength) {
        return address;
      }
      return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }
    return "";
  };
  return (
    <div>
      <div className={`AddAddress`}>
        {recepientAddress !== "" ? (
          <>
            <img src={GreenTick} onClick={onOpen} />
            {shortenAddress(recepientAddress, 6, 6)}
            <EditIcon onClick={onOpen}/>
          </>
        ) : (
          <>
            <img src={addAddress} onClick={onOpen} />
            Add Receipent Address
          </>
        )}
      </div>
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Recepient Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="enterAddress">
              <input
                type="text"
                placeholder="Destination Address"
                value={addressInput}
                onChange={onChangeRecpAddress}
              />
              {recepientAddressError !== "" && (
                <span className="errorMsg">{recepientAddressError}</span>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddRecepient;
