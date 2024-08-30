import { random } from 'lodash';

const nonce = () => Math.random().toString(36).substr(2, 10);

const random = () => Math.random();



module.exports = nonce;


