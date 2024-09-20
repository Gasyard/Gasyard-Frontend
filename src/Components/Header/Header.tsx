import React, { useState } from 'react'
import "./Header.css"
import logo from '../../assets/Gasyard Logo.svg'
import NavDrawer from '../NavDrawer/NavDrawer'
import closeIcon from '../../assets/close_2x_white.svg'
import { NavLink } from 'react-router-dom'
type Props = {}

const Header = (props: Props) => {
  const [selected, setselected] = useState("")
  const [closeNotification, setcloseNotification] = useState(false)
  return (
    <div className="nav-root">
      <div className={`nav-notification ${closeNotification ? "hideDiv":""}`}>
        {/* 🚧 Website Maintenance in Progress 🚧    We're currently performing some updates and will be back online shortly. Thank you for your patience! */}
        {/* Welcome to Kakarot Testnet by Gasyard.fi. For this phase we’ve limited the Bridge amount to 0.05 ETH / $200 max on all networks! */}
        New Quest Live! Complete tasks like bridging ETH and providing liquidity on Kakarot testnet to earn rewards!
        <a href="https://superboard.xyz/quests/gasyard-gas-orchestration-protocol" target="_blank" className="quest-btn">Go to Quest</a>
        <img src={closeIcon} alt="close" onClick={() => setcloseNotification(true)} />
      </div>
      <div className='nav-section'>
        <div className='left-section'>
      
        <NavLink to="/" className='title' >
            <img src={logo} />
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? 'nav-transfer active' : 'nav-transfer')}
            to="/">
            Bridge
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? 'nav-transfer active' : 'nav-transfer')}
            to="/explorer">
            Explorer
          </NavLink>

          <NavLink 
          className={({ isActive }) => (isActive ? 'nav-history active' : 'nav-history')}
          to="/liquidity"> Liquidity</NavLink>
        </div>

        
        

        <div className='right-section'>
          <w3m-button balance='show'/>
          {/* <w3m-network-button /> */}
        </div>
        <div className="mobile-nav"><NavDrawer /></div>
      </div>
    </div>
  )
}

export default Header