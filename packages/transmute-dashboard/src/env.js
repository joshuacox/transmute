const defaultEnv = require('./env.json');

const TRANSMUTE_ENV = process.env.TRANSMUTE_ENV || 'localhost';

let env = defaultEnv[TRANSMUTE_ENV];

export default env;