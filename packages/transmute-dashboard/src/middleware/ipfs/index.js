const ipfsAPI = require('ipfs-api');
const bs58 = require('bs58');

const config = require('../../../env');

export default class IpfsAdapter {
  constructor() {
    this.ipfs = ipfsAPI(config.ipfsConfig);
  }
  healthy() {
    return this.ipfs.id();
  }
  async writeObject(obj) {
    return this.ipfs.object.put({
      Data: new Buffer(JSON.stringify(obj)),
      Links: []
    });
  }
  async readObject(multihash) {
    let data = (await this.ipfs.object.get(multihash)).data.toString();
    return JSON.parse(data);
  }

  bytes32ToMultihash(hash) {
    return bs58.encode(new Buffer('1220' + hash.slice(2), 'hex'));
  }

  multihashToBytes32(ipfshash) {
    return '0x' + new Buffer(bs58.decode(ipfshash).slice(2)).toString('hex');
  }
};