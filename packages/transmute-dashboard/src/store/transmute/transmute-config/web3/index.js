const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');

const env = require('../../../../env.json');
const providerUrl = env.localhost.web3Config.providerUrl;

export const getWeb3 = async () => {
  let web3js;
  return new Promise(async (resolve, reject) => {
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      web3js = new Web3(window.web3.currentProvider);
    } else {
      console.log(`MetaMask not available, defaulting to ${providerUrl}\n`);

      const engine = new ProviderEngine();

      engine.addProvider(
        new RpcSubprovider({
          rpcUrl: providerUrl
        })
      );

      engine.start();

      web3js = new Web3(engine);
    }
    try {
      await web3js.eth.getAccounts();
      resolve(web3js);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getWeb3
};