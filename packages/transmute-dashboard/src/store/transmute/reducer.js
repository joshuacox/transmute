import { Constants } from './constants'
// import { getRandomAddress } from 'env'

export const initialState = {
  hasWeb3: false,
  hasIpfs: false,
  accounts: null,
  defaultAccount: null
};

const handlers = {
  [Constants.WEB3_CONNECTION_REFUSED]: (state, action) => {
    // toast.error('Web3 Connection Refused');
    return {
      ...state,
      hasWeb3: false,
    };
  },
  [Constants.WEB3_CONNECTION_SUCCESS]: (state, action) => {
    // toast.success('Web3 Connected');
    return {
      ...state,
      hasWeb3: true
    };
  },
  [Constants.WEB3_ACCOUNTS]: (state, action) => {
    return {
      ...state,
      accounts: action.payload.accounts
      // defaultAccount: getRandomAddress(action.payload)
    };
  },
  [Constants.SELECT_WEB3_ACCOUNT]: (state, action) => {
    return {
      ...state,
      defaultAccount: action.payload.account
      // defaultAccount: getRandomAddress(action.payload)
    };
  },
  [Constants.IPFS_CONNECTION_REFUSED]: (state, action) => {
    // toast.error('IPFS Connection Refused');
    return {
      ...state,
      hasIpfs: false
    };
  },
  [Constants.IPFS_CONNECTION_SUCCESS]: (state, action) => {
    // toast.success('IPFS Connected');
    return {
      ...state,
      hasIpfs: true
    };
  }
}

export const reducer = (state = initialState, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};