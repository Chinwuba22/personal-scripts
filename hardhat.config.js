require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/qIik4xf0BvzN0toAZX-aegAH4wbtzvZk",
      },
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
  },
  solidity: "0.8.19",
};
