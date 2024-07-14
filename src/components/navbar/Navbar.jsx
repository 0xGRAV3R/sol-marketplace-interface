import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
// import {
//   PhantomWalletAdapter,
// } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <Link to="/myitems"><p>My Items</p></Link>
  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
  const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);


  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/"> 
            <h1>CryptoKet</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="navbar-sign">
        <WalletMultiButton className="wallet-btn"/>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links-sign">
              <WalletMultiButton className="wallet-btn"/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
