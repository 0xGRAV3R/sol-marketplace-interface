import React, { useEffect, useState, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './myitem.css'
import '../../components/bids/bids.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import creator from '../../assets/seller2.png'
import item from '../../assets/item1.png'
import { Bids } from '../../components';
import bids1 from '../../assets/bids1.png'
import { Link } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";

const MyItem = () => {
	const { publicKey } = useWallet();
	const network = WalletAdapterNetwork.Devnet
	const connection = useMemo(() => clusterApiUrl(network), [network]);
	useEffect(() => {
    setNfts([]);
		if (publicKey) {
			setAddress(publicKey.toString())
			getNfts(publicKey)
		}
  }, [publicKey, connection]);

	const [address, setAddress] = useState('');
	const [nfts, setNfts] = useState([]);
	const [groupedNfts, setGroupedNfts] = useState([]);
  const [view, setView] = useState('collection');
  //alert props
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const getNfts = async (address) => {
    setShow(false);

    if (address.length === 0) {
      address = publicKey;
    }

    if (!isValidSolanaAddress(address)) {
      setTitle("Invalid address");
      setMessage("Please enter a valid Solana address or Connect your wallet");
      setLoading(false);
      setShow(true);
      return;
    }

    const connect = createConnectionConfig(connection);

    setLoading(true);
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress: address,
      connection: connect,
      serialization: true,
    });


    if (nftArray.length === 0) {
      setTitle("No NFTs found in " + title);
      setMessage("No NFTs found for address: " + address);
      setLoading(false);
      setView('collection');
      setShow(true);
      return;
    }

    const metadatas = await fetchMetadata(nftArray);
    var group = {};

    for (const nft of metadatas) {
      console.log(nft);
      if (group.hasOwnProperty(nft.data.symbol)) {
        group[nft.data.symbol].push(nft);
      } else {
        group[nft.data.symbol] = [nft];
      }
    }
    setGroupedNfts(group);
    setLoading(false);
    return setNfts(metadatas);
  };

	const fetchMetadata = async (nftArray) => {
    let metadatas = [];
    for (const nft of nftArray) {
      console.log(nft);
      try {
        await fetch(nft.data.uri)
        .then((response) => response.json())
        .then((meta) => { 
          metadatas.push({...meta, ...nft});
        });
      } catch (error) {
        console.log(error);
      }
    }
    return metadatas;
  };

  return( 
		<div className='bids section__padding'>
      <div className="bids-container">
				<div className="bids-container-card">
					
					{nfts.map((item, index) => {
						return (
							<div className="card-column" >
								<div className="bids-card">
									<div className="bids-card-top">
										<img src={bids1} alt="" />
									<Link to={`/post/123`}>
									<p className="bids-title">Abstact Smoke Red</p>
									</Link>
									</div>
									<div className="bids-card-bottom">
										<p>1.25 <span>ETH</span></p>
										<p> <AiFillHeart /> 92</p>
									</div>
								</div>
							</div>
						)
					})}
					{show && nfts.length == 0 && (
						<p style={{color: 'white'}}>You don't have any nft</p>
					)}
				</div>
			</div>
		</div>
  )
};

export default MyItem;
