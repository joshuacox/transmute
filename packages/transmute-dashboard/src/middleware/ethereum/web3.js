import { web3 } from 'env'

export const getAccounts = (_callback) => {
  web3.eth.getAccounts((err, addresses) => {
    if (err) { throw err }
    _callback(addresses)
  })
}
