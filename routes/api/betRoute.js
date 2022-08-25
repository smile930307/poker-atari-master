let mongoose = require('mongoose');
let express = require('express');
require('dotenv').config();
let router = express.Router();
const {coin} = require('../../config/contract');
let { ethers } = require('ethers');


router.route('/set-win').post(async (req,res,next)=>{
    console.log(req.body);
    console.log(req.body.amount, req.body.address)
    const rpcUrl = `https://rpc-mainnet.matic.network`;
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const CoinContract = new ethers.Contract(coin.maticnet,coin.abi,provider);

    const adminaccount = {
        publicKey:process.env.ADMINADDRESS,
        privateKey:process.env.ADMINPRIVATEKEY
    }


    const adminWallet = new ethers.Wallet(adminaccount.privateKey, provider);

    const SignedCoinContract = CoinContract.connect(adminWallet);
    var amount = Number(req.body.amount).toFixed(0);
    var tx =await SignedCoinContract.transfer(req.body.address,ethers.utils.parseUnits(amount.toString(),coin.decimals));
    if(tx!=null) {
      await tx.wait()   
      res.json({data:tx})
    }
})

module.exports = router;