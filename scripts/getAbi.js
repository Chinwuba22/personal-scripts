const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();

const alchemyUrl = process.env.MAINNET_URL;
//PEPE address
const address = "0x6982508145454ce325ddbe47a25d4ec3d2311933";
const apiKey = process.env.ETHERSCAN_API_KEY;
const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;

const getAbi = async function () {
  //getabi of pepe
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);

  //useabi
  const provider = new ethers.JsonRpcProvider(alchemyUrl);
  const contract = new ethers.Contract(address, abi, provider);

  const name = await contract.name();
  const totalSupply = await contract.totalSupply();

  console.log(name);
  console.log(totalSupply.toString());
};

getAbi();
