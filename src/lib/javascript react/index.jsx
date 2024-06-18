const express = require('express');
const app = express();
const port = 3000;
const keygen = require('bitcoinjs-lib')

app.get('/', (req, res) => {
  const keyPair = keygen.ECPair.makeRandom();
  const privateKey = keyPair.toWIF();
  const publicKey = keyPair.getPublicKeyBuffer().toString('hex');
  res.send({
    privateKey,
    publicKey
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/:address', (req, res) => {
  const address = req.params.address;
  const keyPair = keygen.ECPair.fromWIF(address);
  const publicKey = keyPair.getPublicKeyBuffer().toString('hex');
  res.send({
    publicKey
  });
});