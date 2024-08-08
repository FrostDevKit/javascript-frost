import secp256k1 from 'secp256k1';

export function secp256k1_verify(msg, sig, pubkey) {
    return secp256k1.verify(msg, sig, pubkey);
}

class Secp256k1 {
    constructor() {
        this.secp256k1 = secp256k1;
    }
}

const msg = new Uint8Array([1, 2, 3]);

const sig = new Uint8Array([4, 5, 6]);

const pubkey = new Uint8Array([7, 8, 9]);

export default Secp256k1;
