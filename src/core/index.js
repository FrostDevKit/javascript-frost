// Assuming you've installed @noble/secp256k1
// import * as secp256k1 from '@noble/secp256k1'; // ES module
const secp256k1 = require('@noble/secp256k1'); // CommonJS
const { randomBytes } = require('crypto'); // For Node.js, or use window.crypto.getRandomValues in browser

function generateKeyPair() {
    // Generate a cryptographically secure private key (32 bytes)
    const privateKeyBytes = randomBytes(32);
    const privateKeyHex = Buffer.from(privateKeyBytes).toString('hex');

    // Get public key.
    // noble-secp256k1.getPublicKey can take a private key as Uint8Array or hex string.
    // It returns the compressed public key by default.
    const publicKeyBytes = secp256k1.getPublicKey(privateKeyBytes);
    const publicKeyHex = Buffer.from(publicKeyBytes).toString('hex');

    return {
        privateKey: privateKeyHex,
        publicKey: publicKeyHex, // Compressed
    };
}

// Example usage:
// const keyPair = generateKeyPair();
// console.log("Private Key:", keyPair.privateKey);
// console.log("Public Key:", keyPair.publicKey);
