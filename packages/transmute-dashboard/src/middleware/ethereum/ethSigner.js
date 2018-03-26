import { web3 } from 'env'

const contract = require('truffle-contract')

import EthSigner from '../../../build/contracts/EthSigner.json'

const ethSigner = contract(EthSigner)
ethSigner.setProvider(web3.currentProvider)

// HELPER METHODS

export const addUser = (_firstName, _lastName, _email, _fromAddress, _callback) => {
}

export const getUser = (_address, _fromAddress, _callback) => {
}

export const addSignature = (_signatureHash, _callback) => {
}

export const createDocument = (_documentHash, _recipientAddress, _fromAddress, _callback) => {
}

export const signDocument = (_documentHash, _fromAddress, _callback) => {
}
