import * as actions from './actions';
import transmute from './transmute-config';

export default store => {
  setTimeout(async () => {
    console.log('setting up transmute...');
    let web3, accounts, eventStoreAdapter;

    try {
      web3 = await transmute.web3.getWeb3();
      store.dispatch(actions.onWeb3ConnectionSuccess());
      console.log('Web3 Connected.');
      accounts = await web3.eth.getAccounts();
      store.dispatch(actions.setWeb3Accounts(accounts));
    } catch (e) {
      console.warn('web3...', e.message);
      store.dispatch(actions.onWeb3ConnectionRefused());
    }

    try {
      eventStoreAdapter = await transmute.getEventStoreAdapterAsync();
      store.dispatch(actions.onIpfsConnectionSuccess());
      console.log('IPFS EventStore Adapter Connected.');
    } catch (e) {
      console.error('ipfs...', e);
      store.dispatch(actions.onIpfsConnectionRefused());
    }

    window.TT = {
      accounts,
      eventStoreAdapter
    };
  });
};