const fs = require('fs');
const check = require('../../utils/Check');

var BlackHole = artifacts.require("./BlackHoleEosAccount.sol")

module.exports = function (deployer) {
  const configFile = "../config.json";
  const config = JSON.parse(fs.readFileSync(configFile));
  const genesisBlock = config.blackhole.critic_block;
  const minimumAmount = config.blackhole.minimum_amount;
  const erc20TokenAddress = '0xc029ba3dc12e1834571e821d94a07de0a01138ea';

  check(genesisBlock, "BlackHole critical block: " + genesisBlock);
  check(minimumAmount, "BlackHole minimum amount: " + minimumAmount);

  deployer.deploy(BlackHole, erc20TokenAddress, genesisBlock, minimumAmount)
    .then(() => {
      fs.writeFileSync('../erc20_address', erc20TokenAddress);
      fs.writeFileSync('../blackhole_address', BlackHole.address);
    })
};