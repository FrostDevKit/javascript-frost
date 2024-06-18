const {TX, UTXO} = require ('bitcoinjs-lib');  
const {Transaction} = require ('./transaction');

const {Block} = require ('./block');

const {Wallet} = require ('./wallet');

const tx = new Transaction();
const utxo = new UTXO();
const wallet = new Wallet();
const block = new Block();

module.exports = {TX, UTXO, Transaction, Wallet, Block};

