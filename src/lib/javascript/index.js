const {Keys,PrivateKey,PublicKey} = require('bitcoinjs-lib');

const {
  getAddress,
  getAddressFromPrivateKey,
  getAddressFromPublicKey,
  getPrivateKeyFromWIF,
  getPublicKeyFromPrivateKey,
  getPublicKeyFromWIF,
  getWIFFromPrivateKey,
  isValidAddress,
  isValidPrivateKey,
  isValidPublicKey,
  isValidWIF,
} = require('./index');

describe('BitcoinJS-Lib', () => {
  it('should get address from private key', () => {
    const privateKey = new PrivateKey(Buffer.from('00000000000000000000000000000000000000000000000000000000000000000', 'hex'));
    const address = getAddress(privateKey);
    expect(address).toBe('111111111111111111114oLvT2');
  });

  it('should get address from public key', () => {
    const publicKey = new PublicKey(Buffer.from('0311db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5c', 'hex'));
    const address = getAddressFromPublicKey(publicKey);
    expect(address).toBe('111111111111111111114oLvT2');
    expect(isValidAddress(address)).toBe(true);
  });

  it('should get address from private key', () => {
    const privateKey = new PrivateKey(Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex'));
    const address = getAddressFromPrivateKey(privateKey);
    expect(address).toBe('111111111111111111114oLvT2');
  });
});