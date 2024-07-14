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

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <p>My Items</p>
    
  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
   const [user,setUser] = useState(false)
   const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);

  const handleLogout = () => {
    setUser(false);
  }
  const handleLogin = () => {
    setUser(true);
  }

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/"> 
            <h1>CryptoKet</h1>
          </Link>
        </div>
      </div>
      <div className="navbar-sign">
        <button type='button' className='secondary-btn'>Connect</button>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links-sign">
              <button type='button' className='secondary-btn'>Connect</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
