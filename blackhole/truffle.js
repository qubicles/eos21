/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
const memonic = "sldkfsd sdlkfjs d ldskfj sldkjf sdlkf jsdlkfj sdlfj dslk"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(memonic, "https://rinkeby.infura.io/api_key")
      },
      network_id: 3
    },
    live: {
      provider: function() {
        return new HDWalletProvider(memonic, "https://mainnet.infura.io/api_key")
      },
      network_id: 1,
      gas: 4500000,
      gasPrice: 10000000000
    }
    
  },
  // mocha: {
  //   reporter: '../eth-gas-reporter',
  //   reporterOptions : {
  //     currency: 'USD',
  //     gasPrice: 21
  //   }
  // }
};
