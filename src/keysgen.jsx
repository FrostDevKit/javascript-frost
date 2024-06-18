import { ellipticCurve } from 'eciesjs';
import { secp256k1 } from 'eciesjs';

const ec = new ellipticCurve(secp256k1);

const key = ec.generateKeyPair();

const publicKey = key.getPublic('hex');

const privateKey = key.getPrivate('hex');

console.log(publicKey);

console.log(key);
  
