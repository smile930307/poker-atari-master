import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.png';
import introLogo from '../assets/1.png';
import { ethers } from 'ethers';
import Abi from '../contract/abi.json';

var tokenAddress = "0xb140665dde25c644c6b418e417c930de8a8a6ac9";
var myContract = new ethers.Contract(tokenAddress, Abi);
var adminAddress = "0xeef1Ca43C1Ba1faDF1283b008a85C3826c7E36C5";

const Home = props => {
	const {setAvailable} = props;
	const [chipCount, setChipCount] = useState(0);
	const [walletAddress, setWalletAddress] = useState(null);
	const [depositWait, setDepositWait] = useState(false);

	useEffect(()=>{
		getBalance();
	  },[])

	const getBalance = async () =>{
		if(window.ethereum){
		  try{
			var provider = new ethers.providers.Web3Provider(window.ethereum);
		  const accounts = await provider.listAccounts();
		  console.log(accounts)
		  setWalletAddress(window.ethereum.selectedAddress);
		  const signer = provider.getSigner();
		  var MyContract = myContract.connect(signer);
		  console.log(MyContract);
		  let balance = await MyContract.balanceOf(window.ethereum.selectedAddress);
		  console.log(balance.toString());
		  setChipCount(balance.toString())
		  }
		  catch(err){
			console.log(err)
		  }
		}
	  }

	const handleConnect = () =>{
 
		if (window.ethereum) {
		  try {
			window.ethereum.enable().then((res)=> {
			  console.log("public key is ", window.ethereum.selectedAddress);
			  setWalletAddress(window.ethereum.selectedAddress);
			  if(res){
				getBalance();
			  }
			  setAvailable(true);
			  // User has allowed account access to DApp...
			});
		  } catch (e) {
			// User has denied account access to DApp...
		  }
		}
		// Legacy DApp Browsers
		else if (window.web3) {
		  // web3 = new Web3(web3.currentProvider);
		  }
		// Non-DApp Browsers
		else {
		  alert("You have to install MetaMask !");
		}
	}

	const handleDeposit = async () =>{
		// const provider = new ethers.providers.Web3Provider(window.ethereum);
		// const signer = provider.getSigner();
		// var MyContract = myContract.connect(signer);
		// var tx = await MyContract.transfer(adminAddress, 100)
		// .catch((err) => {
		// 	console.log(err)
		// });
		// if(tx!=undefined){
		// 	setDepositWait(true);
		// 	await tx.wait();
		// 	setAvailable(true);
		// }

		setDepositWait(true);
			// await tx.wait();
			setAvailable(true);
	} 
	return(
		<div className="loading-container">
			<div className='game-action-bar' >
				<div className = "logo">
					<img src = {logo} alt = "logo" width = "30px" />
				</div>
				<div className = "logo">
					<button className = "x-connect-button" onClick = {handleConnect}>{walletAddress?chipCount:"Connect"}</button>
				</div>
			</div>
			<div className = "x-grid1">
				
				<div className='spinner-container' >
					<img src={introLogo} alt="Loading..."/>
				</div>
				<div className = "x-font1 x-home-text-content">
					{walletAddress?chipCount>=100?"please deposit Atari Token to enjoy!":"your wallet don't have enough coin. \n in order to play game, you have to deposit 1000 atari.\n please add 1000 atari coin to wallet for game!":"please connect metamask to play Atari Poker!"}
				</div>
				<div className = "x-deposit-pending">
					{depositWait?"deposit progress is pending.   Please wait...": null}
				</div>
				<div className = "x-home-text-content">
					{chipCount>=100&&!depositWait?
						<button className = "x-connect-button" onClick = {handleDeposit}>Deposit</button>
						:null
					}
					</div>
			</div>
		</div>
	)
}

export default Home;