const Migrations = artifacts.require("Migrations");
const myNFT = artifacts.require("MyNFT");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(myNFT);
};
