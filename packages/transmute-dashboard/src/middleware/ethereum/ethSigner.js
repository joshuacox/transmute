import { getWeb3 } from './web3'

const contract = require('truffle-contract')

import EthSigner from '../../../build/contracts/EthSigner.json'

const ethSigner = contract(EthSigner)
ethSigner.setProvider(web3.currentProvider)

// HELPER METHODS

export const addUser = async (_firstName, _lastName, _email, _fromAddress, _callback) => {
  let web3 = await getWeb3();
}

export const getUser = async (_address, _fromAddress, _callback) => {
}

export const addSignature = async (_signatureHash, _callback) => {
}

export const createDocument = async (_documentHash, _recipientAddress, _fromAddress, _callback) => {
}

export const signDocument = async (_documentHash, _fromAddress, _callback) => {
}
