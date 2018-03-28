import { Constants } from './constants'

export const initialState = {
  hasWeb3: false,
  hasIpfs: false,
  accounts: null,
  account: null
};

const handlers = {
  [Constants.WEB3_CONNECTION_REFUSED]: (state, action) => {
    return {
      ...state,
      hasWeb3: false,
    };
  },
  [Constants.WEB3_CONNECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      hasWeb3: true
    };
  },
  [Constants.WEB3_ACCOUNTS]: (state, action) => {
    return {
      ...state,
      accounts: action.payload.accounts
    };
  },
  [Constants.SELECT_WEB3_ACCOUNT]: (state, action) => {
    console.log("update state")
    return {
      ...state,
      account: action.payload.account
    };
  },
  [Constants.IPFS_CONNECTION_REFUSED]: (state, action) => {
    return {
      ...state,
      hasIpfs: false
    };
  },
  [Constants.IPFS_CONNECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      hasIpfs: true
    };
  }
}

export const reducer = (state = initialState, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};