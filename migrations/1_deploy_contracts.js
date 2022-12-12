const TheftPrevention = artifacts.require("./TheftPrevention.sol");

module.exports = function (deployer) {
  deployer.deploy(TheftPrevention);
};
