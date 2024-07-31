import React from "react";
import './Liquidity.css'

type Props = {};

const Liquidity = (props: Props) => {
  return (
    <div className="LiquidityRoot">
      <div className="liquidity-table-container">
        <table>
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Status</th>
              <th>TVL</th>
              <th>1 Day Volume </th>
              <th>Your Liquidity</th>
              <th>Fees Earned </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>
                <div className="chain">Ethereum</div>
            </td>
            <td></td>
            <td>$1,002.43</td>
            <td>$1,002.43</td>
            <td>$1.43</td>
            <td>
                <div className="action_btn">
                    <button>Deposit</button>
                    <button>Withdraw</button>
                </div>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Liquidity;
