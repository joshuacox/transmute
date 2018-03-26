var Migrations = artifacts.require("./Migrations.sol");
var EthSigner = artifacts.require("./EthSigner.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(EthSigner);
};
