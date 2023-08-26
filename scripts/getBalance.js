const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const localProviderUrl = "http://127.0.0.1:8545/";
  const provider = new ethers.JsonRpcProvider(localProviderUrl);

  const account0Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const account0Balance = await provider.getBalance(account0Address);
  console.log("account0Balance", ethers.formatEther(account0Balance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
