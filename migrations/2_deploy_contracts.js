const NftContract = artifacts.require('MyNFT')

module.exports = function (deployer) {
  deployer.deploy(NftContract)
}
