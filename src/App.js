import './App.css';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";
import { Col, Row, Button, Form} from "react-bootstrap";
import AlertDismissible from './components/alert/alertDismissible';
import PreLoader from './components/preloader';
import Collections from './components/collections';
import GalleryView from './components/galleryview';
import { Footer, Navbar } from './components'
import { Routes, Route } from "react-router-dom";
import { Home, Item, MyItem } from './pages'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myitems" element={<MyItem />} />
        <Route path=":item/:id" element={<Item />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
