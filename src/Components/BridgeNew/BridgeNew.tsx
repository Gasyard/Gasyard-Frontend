import React from 'react'
import "./BridgeNew.css"
import downArrow from '../../assets/SVG.svg'
import { Stat, StatNumber } from '@chakra-ui/react'
import QuoteSection from '../QuoteSection/QuoteSection'
type Props = {}

const BridgeNew = (props: Props) => {
  return (
    <div className='BridgeRoot'>
        <div className="BridgeApp">
            <div className="headline">Bridge</div>

            <div className="from-chain">
                <div className="labels">
                    <span className='tagline'>From</span>
                    <span className='balance'>Balance:-</span>
                </div>
                <button className="chain1-btn">Select Network <img src={downArrow} /></button>
                <input
                type="text"
                placeholder="0.0"
                className='inputToken'
                // value={inputToken}
                // onChange={handleInputChange1}
                // onBlur={handleBlurEvent}
                // onKeyPress={(e) => {
                //   if (!isNumberKey(e)) {
                //     e.preventDefault();
                //   }
                // }}
                 /> 
                 <button className="max-btn">
                    Max
                 </button>
            </div>

            <div className="to-chain">
                <div className="labels">
                    <span className='tagline'>To</span>  
                </div>
                <button className="chain2-btn">Select Network <img src={downArrow} /></button>
                <input
                type="text"
                placeholder="0.0"
                className='outputToken'
                readOnly
                 /> 
            </div>

            <div className="review">
                <button className="review-btn">
                    Review order
                </button>
            </div>

            <QuoteSection address={"0xjbdhhdh"}
            transactionTime={"1.2s"}
            fees={String(1.2)}/>
        </div>
    </div>
  )
}

export default BridgeNew