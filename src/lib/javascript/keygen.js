const {Keys,PrivateKey,PublicKey} = require('bitcoinjs-lib');

const key = new PrivateKey();
const publicKey = key.toPublicKey();
const address = publicKey.toAddress();
const keys = Keys.fromPrivateKey(key);
const publicKey = keys.publicKey;
const privateKey = keys.toWIF();

console.log(address.toString());
console.log(publicKey.toString('hex'));
console.log(privateKey);

