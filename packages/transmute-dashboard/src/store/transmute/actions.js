import * as Constants from './constants';

export const setWeb3Accounts = accounts => {
  return {
    type: Constants.WEB3_ACCOUNTS,
    payload: {
      accounts
    }
  };
};

export const onWeb3ConnectionRefused = () => {
  return {
    type: Constants.WEB3_CONNECTION_REFUSED
  };
};

export const onWeb3ConnectionSuccess = () => {
  return {
    type: Constants.WEB3_CONNECTION_SUCCESS
  };
};

export const onIpfsConnectionRefused = () => {
  return {
    type: Constants.IPFS_CONNECTION_REFUSED
  };
};

export const onIpfsConnectionSuccess = () => {
  return {
    type: Constants.IPFS_CONNECTION_SUCCESS
  };
};