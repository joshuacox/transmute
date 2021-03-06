var sha1 = require('js-sha1');

var localStorage = window ? window.localStorage : null;

if (!window) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const localStorageAdapter = {
  getStorage: function() {
    return localStorage;
  },
  getItem: function(db, key) {
    return new Promise(function(resolve, reject) {
      resolve(JSON.parse(db.getItem(key)));
    });
  },
  setItem: function(db, value) {
    const valueAsJsonString = JSON.stringify(value);
    const key = sha1(valueAsJsonString).substring(0, 32); // not safe... consider guids here...
    return new Promise(function(resolve, reject) {
      db.setItem(key, valueAsJsonString);
      resolve(key);
    });
  }
};

const localStorageDB = localStorageAdapter.getStorage();

const getReadModelAdapterAsync = async () => {
  const readModelAdapter = {
    getItem: id => {
      let item = JSON.parse(localStorageDB.getItem(id));
      return item ? item : null;
    },
    setItem: (id, value) => {
      return localStorageDB.setItem(id, JSON.stringify(value));
    }
  };

  return readModelAdapter;
};

export default getReadModelAdapterAsync;
