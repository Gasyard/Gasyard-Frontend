import SubtractCoin from '../../assets/coins/Subtract.svg'
import './QuoteSection.css'

type quoteProp = {
    address: string | undefined;
    transactionTime: string;
    fees: string;
    chain1:any
  };
const QuoteSection = ({ address, transactionTime, fees, chain1 }: quoteProp) => {
    return (
      <>
        <div className="quoteRoot">
          <div className="quote_row">
            <div className="quote_column col1">Points Earned</div>
            <div className="quote_column col2">
              {/* <img src={SubtractCoin} alt="points"/> */}
              <span className='coin'></span>
              +400
            </div>
          </div>
          <div className="quote_row">
            <div className="quote_column col1">Estimated Time</div>
            <div className="quote_column col2">~ 30 sec</div>
          </div>
          <div className="quote_row">
            <div className="quote_column col1">Network</div>
            <div className="quote_column col2">{chain1}</div>
          </div>
          <div className="quote_row">
            <div className="quote_column col1">Network Fee</div>
            <div className="quote_column col2">${fees} USD</div>
          </div>
        </div>
      </>
    );
  };
  
  export default QuoteSection;