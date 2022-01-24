const express = require('express');
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js');

const app = express();
const cors = require('cors');
const port = 3042;

let ec = new EC('secp256k1');
const wallets = 4;
const balances = {};

for (let i = 0; i < wallets; i++) {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic().encode('hex');
  const privateKey = key.getPrivate().toString(16);
  const address = publicKey.slice(-40);

  const balance = 100 + i * 150;
  balances[address] = balance;
  console.log(`(${i}) ${address} : (${balance})`);
  console.log(`${privateKey}`);
}

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

// const balances = {
//   1: 100,
//   2: 50,
//   3: 75
// };

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { senderAddress, recipient, amount, sendePrivateKey } = req.body;
  const message = {
    amount: amount,
    senderAddress: senderAddress,
    recipient: recipient
  };
  const msgHash = SHA256(message).words;
  const publicKey = ec.recoverPubKey(msgHash, signature, recid);
  const key = ec.keyFromPublic(publicKey);
  if (key.verify(msgHash, signature)) {
    balances[senderAddress] -= amount;
    balances[recepient] = (balances[recepient] || 0) + +amount;
  }
  res.send({ balance: balances[senderAddress] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
