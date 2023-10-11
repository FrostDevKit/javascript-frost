// Import necessary modules and libraries
const { Shake256_114, Ed448, Point, Scalar } = require('minimal_ed448');
const { GroupEncoding } = require('ciphersuite');

// Define a generic Curve interface
class Curve {
  static get CONTEXT() {
    return Buffer.from("FROST-ED448-SHAKE256-v1");
  }
}

// The RFC-8032 Ed448 challenge function
class Ietf8032Ed448Hram {
  static hram(context, R, A, m) {
    const contextLen = Buffer.from([context.length]);
    const contextAndChal = Buffer.concat([Buffer.from("SigEd448"), contextLen, context, R.to_bytes(), A.to_bytes(), m]);
    const digest = Shake256_114.digest(contextAndChal);
    const scalarArray = new Uint8Array(digest);
    return Scalar.wide_reduce(scalarArray);
  }
}

// The challenge function for FROST's Ed448 ciphersuite
class IetfEd448Hram {
  static hram(R, A, m) {
    return Ietf8032Ed448Hram.hram(Buffer.from([]), R, A, m);
  }
}

module.exports = {
  IetfEd448Hram,
  Curve
};

