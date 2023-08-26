const { ethers } = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");
require("dotenv").config();

const ALCHEMY_URL = process.env.MAINNET_URL;
const etherscanApi = process.env.ETHERSCAN_API_KEY;
const providers = new ethers.JsonRpcProvider(ALCHEMY_URL);
const { getAbi, getPoolImmutables } = require("../helper");
const poolAddress = "0x4585fe77225b41b697c938b018e2ac67ac5a20c0";
const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const getPrice = async function (inputAmount) {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    providers
  );

  const tokenAddress0 = await poolContract.token0();
  const tokenAddress1 = await poolContract.token1();
  const abitoken0 = await getAbi(tokenAddress0);
  const abitoken1 = await getAbi(tokenAddress1);

  const tokenContract0 = new ethers.Contract(
    tokenAddress0,
    abitoken0,
    providers
  );
  const tokenContract1 = new ethers.Contract(
    tokenAddress1,
    abitoken1,
    providers
  );
  const tokenSymbol0 = await tokenContract0.symbol();
  const tokenSymbol1 = await tokenContract1.symbol();
  const tokenDecimal0 = await tokenContract0.decimals();
  const tokenDecimal1 = await tokenContract1.decimals();
  const quoterContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    providers
  );

  const immutables = await getPoolImmutables(poolContract);

  const amountIn = ethers.parseUnits(inputAmount.toString(), tokenDecimal0);

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    0
  );
  const amountOut = ethers.formatUnits(quotedAmountOut, tokenDecimal1);
  console.log("=============");
  console.log(
    `${inputAmount} ${tokenSymbol0} can be swapped for ${amountOut} ${tokenSymbol1}`
  );
  console.log("=============");
};

getPrice(1);
