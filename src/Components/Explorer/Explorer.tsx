import React from 'react'
import './Explorer.css'
import SearchIcon from '../../assets/search_logo.svg'
import arb_logo from '../../assets/arb_logo.svg'
import eth from '../../assets/coins/eth.svg'
import redirect_logo from '../../assets/redirect_grey.svg'
import copytext from '../../assets/copyText2.svg'

type Props = {}

const Explorer = (props: Props) => {
  return (
    <div className='ExplorerApp'>
        {/* <div className="content-section">
        <div className="content">
            <div className="title">Yard Explorer</div>
            <div className="subtitle">Track all your transactions at one place</div>
            <div className="input-search">
                <img src={SearchIcon}/>
            <input type="text" placeholder='Search by transaction hash or address' />
            </div>
        </div>
        </div> */}
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Settlement Hash</th>
                        <th>Status</th>
                        <th>To Address</th>
                        <th>From </th>
                        <th>To</th>
                        <th>Time </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div className="dflex-row hash">0x323f8e24...4171f42a69 <img src={copytext}/></div></td>
                        <td>
                            <div className="statusWrap">
                            <span className='status Success'></span>
                            Success
                            </div>
                            
                        </td>
                        <td><div className="dflex-row address">0x323f8e24...4171f42a69 <img src={redirect_logo}/></div></td>
                        <td>
                            <div className="dflex-row token">Token: <img src={eth} className='logo' />0.01 ETH<img src={redirect_logo}/></div>
                        </td>

                        <td>
                            <div className="dflex-row chain">Chain: <img src={eth} className='logo' />0.01 ETH<img src={redirect_logo}/></div>
                        </td>
                        <td>Jun-10-2024 04:36:47 AM UTC</td>
                    </tr>

                    <tr>
                        <td><div className="dflex-row hash">0x323f8e24...4171f42a69 <img src={copytext}/></div></td>
                        <td>
                            <div className="statusWrap">
                            <span className='status Failed'></span>
                            Failed
                            </div>
                            
                        </td>
                        <td><div className="dflex-row address">0x323f8e24...4171f42a69 <img src={redirect_logo}/></div></td>
                        <td>
                            <div className="dflex-row token">Token: <img src={eth} className='logo' />0.01 ETH<img src={redirect_logo}/></div>
                        </td>

                        <td>
                            <div className="dflex-row chain">Chain: <img src={eth} className='logo' />0.01 ETH<img src={redirect_logo}/></div>
                        </td>
                        <td>Jun-10-2024 04:36:47 AM UTC</td>
                    </tr>

                    <tr>
                        <td><div className="dflex-row hash">0x323f8e24...4171f42a69 <img src={copytext}/></div></td>
                        <td>
                            <div className="statusWrap">
                            <span className='status Pending'></span>
                            Pending
                            </div>
                            
                        </td>
                        <td><div className="dflex-row address">0x323f8e24...4171f42a69 <img src={redirect_logo}/></div></td>
                        <td>
                            <div className="dflex-row token">Token: <img src={eth} className='logo' />0.01 ETH<img src={redirect_logo}/></div>
                        </td>

                        <td>
                            <div className="dflex-row chain">Chain: <img src={eth} className='logo' />0.01 ETH<img src={redirect_logo}/></div>
                        </td>
                        <td>Jun-10-2024 04:36:47 AM UTC</td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Explorer