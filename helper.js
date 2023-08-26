const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.ETHERSCAN_API_KEY;

exports.getAbi = async function (address) {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
  //getabi
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);
  return abi;
};

exports.getPoolImmutables = async function (poolContract) {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };
  return immutables;
};
