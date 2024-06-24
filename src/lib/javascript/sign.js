const { Sign } = require('crypto');
const { createHash } = require('crypto');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const sign = (data, secret) => {
  const hash = createHash('sha256');
  hash.update(data);
  hash.update(secret);
  return hash.digest('hex');
};

const verify = (data, secret, signature) => {
  return sign(data, secret) === signature;
};

module.exports = {
  sign,
  verify
};

const randomBytes = (size) => {
  return new Promise((resolve, reject) => {
    randomBytes(size, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
};

async function sign(): (data, secret) => {
  return randomBytes(32).then(buf => {
    const sign = new Sign('sha256');
    sign.update(data);
    sign.update(secret);
    sign.end();
    return sign.sign(buf);
  });
};
async function verify(): (data, secret, signature) => {
  const buf = await randomBytes(32);
  const sign = new Sign('sha256');
  sign.update(data);
  sign.update(secret);
  sign.end();
  return sign.verify(buf, signature);
};

console .log(sign('123', '123'));

