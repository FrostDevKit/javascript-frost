const { createHmac, randomBytes } = require('crypto');
const { promisify } = require('util');

const randomBytesAsync = promisify(randomBytes);

// Sign data securely with HMAC
const sign = (data, secret) => {
  const hmac = createHmac('sha256', secret);
  hmac.update(data);
  return hmac.digest('hex');
};

// Verify data securely
const verify = (data, secret, signature) => {
  return sign(data, secret) === signature;
};

async function asyncSign(data, secret) {
  const key = await randomBytesAsync(32); // Generate random key
  const hmac = createHmac('sha256', secret + key.toString('hex'));
  hmac.update(data);
  return hmac.digest('hex');
}

async function asyncVerify(data, secret, signature) {
  const key = await randomBytesAsync(32);
  const hmac = createHmac('sha256', secret + key.toString('hex'));
  hmac.update(data);
  return hmac.digest('hex') === signature;
}

(async () => {
  console.log(sign('123', 'secret-key')); // Synchronous signing
  console.log(await asyncSign('123', 'secret-key')); // Asynchronous signing
})();
