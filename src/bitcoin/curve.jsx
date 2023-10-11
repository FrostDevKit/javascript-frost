import { publickey, privatekey, P-256, SHA-256 } from 'jscu';

elliptic.generateKey('P-256').then( (key) => {
  // now you get the JWK public and private keys
  const publicKey = key.publicKey;
  const privateKey = key.privateKey;
})

const publicJwk = {kty: 'EC', crv: 'P-256', x: '...', y: '...'}; // public key
const privateJwk = {ktyp: 'EC', crv: 'P-256', x: '...', y: '...', d: '...'}; // paired private key
const msg = ...; // Uint8Array

// sign
ec.sign(
  msg,
  privateJwk,
  'SHA-256',
  'raw' // output signature is not formatted. DER-encoded signature is available with 'der'.
  ).then( (signature) => {
  // now you get the signature in Uint8Array
  return ec.verify(
    msg,
    sign,
    publicJwk,
    'SHA-256',
    'raw' // input signature is not formatted. DER-encoded signature is available with 'der'.
    );
}).then( (valid) => {
  // now you get the result of verification in boolean
});

const publicJwkA = {kty: 'EC', crv: 'P-256', x: '...', y: '...'}; // public key of player A
const privateJwkA = {ktyp: 'EC', crv: 'P-256', x: '...', y: '...', d: '...'}; // paired private key of player A

const publicJwkB = {kty: 'EC', crv: 'P-256', x: '...', y: '...'}; // public key of player B
const privateJwkB = {ktyp: 'EC', crv: 'P-256', x: '...', y: '...', d: '...'}; // paired private key of player B

// At A's side
const sharedAtPlayerA = ec.deriveSecret(publicJwkB, privateJwkA).then( (secretAtA) => {
  // now you get the shared secret from my (player A's) private key and player B's public key
})

// At B's side
const sharedAtPlayerB = ec.deriveSecret(publicJwkA, privateJwkB).then( (secretAtB) => {
  // now you get the shared secret from my (player B's) private key and player A's public key
})
