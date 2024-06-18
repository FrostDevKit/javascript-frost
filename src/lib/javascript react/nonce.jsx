const { transcript, hash_binding_factor, multiexp_vartime } = require('-transcript-lib');

class Block {
  constructor(index, previousHash, timestamp, transactions, nonce) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = nonce;
  }
}
class Transaction {
  constructor(id, inputs, outputs) {
    this.id = id;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
class UTXO {
  constructor(id, index, value, address, status) {
    this.id = id;
    this.index = index;
    this.value = value;
    this.address = address;
    this.status = status;
  }
}
class Wallet {
  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}

module.exports = {
  Block,
  Transaction,
  UTXO,
  Wallet,
};

class TX {
  constructor(id, inputs, outputs) {
    this.id = id;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
class UTXO {
  constructor(id, index, value, address, status) {
    this.id = id;
    this.index = index;
    this.value = value;
    this.address = address;
    this.status = status;
  }
}
class Wallet {
  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}

module = {
  TX,
  UTXO,
  Wallet,
};

const {
  TX,
  UTXO,
  Wallet,
} = module;