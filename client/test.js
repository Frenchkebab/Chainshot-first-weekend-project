const EC = require('elliptic').ec;
const SHA256 = require('crypto-js');

const ec = new EC('secp256k1');
const key = ec.genKeyPair();

const privateKey = key.getPrivate().toString(16);
const publicKey = key.getPublic().encode('hex');

console.log(privateKey);
console.log(publicKey);

const fkey = ec.keyFromPrivate(privateKey).toString();
console.log(JSON.stringify(fkey) === JSON.stringify(publicKey));

// const message = {
//   sender: sender,
//   recipient: recipient,
//   amount: amount
// };
// const msgHash = SHA256(message);
// const signature = key.sign(msgHash.words);
// const recid = ec.getKeyRecoveryParam(msgHash.words, signature, key.getPublic());
