const {Keys,PrivateKey,PublicKey} = require('bitcoinjs-lib');

const key = new PrivateKey();
const PublicKey = key.toPublicKey();
const addressFromPublicKey = publicKey.toAddress();
const keys = Keys.fromPrivateKey(key);
const publicKey = keys.publicKey;
const privateKey = keys.toWIF();

const {Address} = bitcoin.payments.p2pkh({pubkey: publicKey});
const {address: p2wpkhAddress} = bitcoin.payments.p2wpkh({pubkey: publicKey});const { address: testnetAddress } = bitcoin.payments.p2wpkh({pubkey: publicKey, network: bitcoin.networks.testnet});
const {address} = bitcoin.payments.p2wpkh({pubkey: publicKey, network: bitcoin.networks.regtest});
const {address} = bitcoin.payments.p2ptr({pubkey: publicKey, network: bitcoin.networks.testnet});

const Keys = {
    fromPrivateKey: (privateKey) => {
        return new Keys(privateKey);
    },
    fromExtendedPrivateKey: (extendedPrivateKey) => {
        return new Keys(extendedPrivateKey);
    },
    fromExtendedPublicKey: (extendedPublicKey) => {
        return new Keys(extendedPublicKey);
    },
    fromPublicKey: (publicKey) => {
        return new Keys(publicKey);
    },
    fromWIF: (wif) => {
        return new Keys(wif);
    },
    fromString: (str) => {
        return new Keys(str);
    },
}

console.log(address.toString());
console.log(publicKey.toString('hex'));
console.log(privateKey);

