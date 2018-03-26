import { Constants } from './constants'
import {
  getAccounts
} from 'middleware/ethereum/web3'

export const getWeb3Accounts = () => dispatch => {
  getAccounts((addresses) => {
    dispatch({
      type: Constants.RECEIVE_WEB3_ACCOUNTS,
      payload: addresses
    })
  })
}

export const updateDebugSettings = (formModel) => dispatch => {
  dispatch({
    type: Constants.DEBUG_SETTINGS_UPDATED,
    payload: formModel
  })
}