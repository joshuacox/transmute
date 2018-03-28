const Web3 = require('web3');
const env = require('./src/env.json');

module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      provider: new Web3.providers.HttpProvider(
        env.localhost.web3Config.providerUrl
      ),
      network_id: '*' // Match any network id
    },
  }
};