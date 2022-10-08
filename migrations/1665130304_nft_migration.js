const myNFT = artifacts.require("MyNFT");

module.exports = async function (_deployer) {

  // const [deployer] = await ethers.getSigners();

  // console.log(`Deploying contracts with the account: ${deployer.address}`);
  // console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

  // // Fetch the compiled contract using ethers.js
  // const NFT = await ethers.getContractFactory("NFT");
  // // calling deploy() will return an async Promise that we can await on 
  // const nft = await NFT.deploy();

  // console.log(`Contract deployed to address: ${nft.address}`)

  // Use deployer to state migration tasks.
  // _deployer.deploy(myNFT);
};
