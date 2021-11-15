const Migrations = artifacts.require("Hello");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
