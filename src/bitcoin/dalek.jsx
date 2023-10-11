// Import necessary modules and libraries
const { Ciphersuite } = require('ciphersuite');
const { Scalar } = require('dalek_ff_group');

// Define a generic Curve interface
class Curve {
  static get CONTEXT() {
    return Buffer.from("FROST-RISTRETTO255-SHA512-v1");
  }
}

// Define the challenge function for Ristretto ciphersuite
class IetfRistrettoHram {
  static hram(R, A, m) {
    const contextAndChal = Buffer.concat([Curve.CONTEXT, Buffer.from("chal")]);
    const curve = new Ciphersuite.Ristretto();

    let hash = new curve.H();
    if (contextAndChal.length !== 0) {
      hash.update(Buffer.concat([contextAndChal, R.compress().to_bytes(), A.compress().to_bytes(), m]));
    }

    return Scalar.from_hash(hash.chain_update(Buffer.concat([R.compress().to_bytes(), A.compress().to_bytes(), m])));
  }
}

// Define the challenge function for Ed25519 ciphersuite
class IetfEd25519Hram {
  static hram(R, A, m) {
    const context = Buffer.from("FROST-ED25519-SHA512-v1");
    const curve = new Ciphersuite.Ed25519();

    let hash = new curve.H();
    if (context.length !== 0) {
      hash.update(Buffer.concat([context, R.compress().to_bytes(), A.compress().to_bytes(), m]));
    }

    return Scalar.from_hash(hash.chain_update(Buffer.concat([R.compress().to_bytes(), A.compress().to_bytes(), m]));
  }
}

// Conditional imports based on features
if (process.env.feature === "ristretto") {
  module.exports = {
    IetfRistrettoHram
  };
} else if (process.env.feature === "ed25519") {
  module.exports = {
    IetfEd25519Hram
  };
}

