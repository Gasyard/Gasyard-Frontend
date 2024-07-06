import { useEffect, useState } from "react";
import SubtractCoin from "../../assets/coins/Subtract.svg";
import "./QuoteSection.css";
import { Spinner } from "@chakra-ui/react";

type quoteProp = {
  address: string | undefined;
  transactionTime: string;
  fees: string;
  chain1: any;
};
const QuoteSection = ({
  address,
  transactionTime,
  fees,
  chain1,
}: quoteProp) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // 1 seconds

    return () => clearTimeout(timer);
  }, [address, transactionTime, fees, chain1]);

  return (
    <>
      <div className="quoteRoot">
        {showLoader ? (
          <>
          <div className="loader">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            </div>
          </>
        ) : (
          <>
            <div className="quote_row">
              <div className="quote_column col1">Points Earned</div>
              <div className="quote_column col2">
                {/* <img src={SubtractCoin} alt="points"/> */}
                <span className="coin"></span>
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
          </>
        )}
      </div>
    </>
  );
};

export default QuoteSection;
