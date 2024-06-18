const nonce = () => Math.random().toString(36).substr(2, 10);

module.exports = nonce;


