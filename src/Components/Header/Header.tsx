import React from 'react'
import "./Header.css"
import logo from '../../assets/Gasyard Logo.svg'
type Props = {}

const Header = (props: Props) => {
  return (
    <div className="nav-root">
      <div className='nav-section'>
        <div className='left-section'>
          <a href="" className='title'>
            <img src={logo} />
          </a>

          <a className="nav-transfer" href="#">
            Transaction History
          </a>

          <a className="nav-history" href="#"> Liquidity</a>
        </div>

        <div className='right-section'>
          <w3m-button balance='show'/>
          {/* <w3m-network-button /> */}
        </div>
      </div>
    </div>
  )
}

export default Header