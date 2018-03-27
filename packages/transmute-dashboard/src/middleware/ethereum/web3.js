const Web3 = require('web3');

const config = require('../../../env');

const web3Config = {
  providerUrl: config.web3Config.providerUrl
};

const getWeb3 = async () => {
  let web3js;
  return new Promise(async (resolve, reject) => {
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      web3js = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        `MetaMask not available, defaulting to ${web3Config.providerUrl}\n`
      );
      web3js = new Web3(
        new Web3.providers.HttpProvider(web3Config.providerUrl)
      );
    }
    try {
      await web3js.eth.getAccounts();
      resolve(web3js);
    } catch (e) {
      reject(e);
    }
  });
};

const getWeb3Accounts = async () => {
  return new Promise((resolve, reject) => {
    this.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        reject(err);
      }
      resolve(accounts);
    });
  });
}

module.exports = {
  web3Config,
  getWeb3,
  getWeb3Accounts
};
