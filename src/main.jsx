import {Key, Signer, Partires, Index, Pair } from 'bitcoinjs-lib';
import {Relays, Events, Npub, Nsec } from 'nostr-tools;


const NETWORK = bitcoin.networks.testnet;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BTreeMap = new Map();

function getThingsFromParties(prompt, ourIndex, parties) {
  const items = new Map();
  for (const i of parties) {
    if (i === ourIndex) {
      continue;
    }
    const theirPoly = rl.questionSync(`${prompt} ${i}: `);

    try {
      const poly = JSON.parse(theirPoly);
      items.set(i, poly);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('\n');
  return items;
}

class FrostKeyPair {
  constructor(frostKey, secretShare, ourIndex) {
    this.frostKey = frostKey;
    this.secretShare = secretShare;
    this.ourIndex = ourIndex;
  }
}

function frostKeygen(threshold, nParties) {
  const frost = require('schnorr-fun'); // You may need to install this library
  const rand = require('rand'); // You may need to install this library

  const rng = new rand.ThreadRng();

  const mySecretPoly = frost.generateScalarPoly(threshold, rng);
  const myPublicPoly = frost.toPointPoly(mySecretPoly);
  const myPolyStr = JSON.stringify(myPublicPoly);

  const ourIndex = parseInt(rl.questionSync('Enter our participant index: '));

  console.log(`Share our public polynomial (index ${ourIndex}): ${myPolyStr}\n\n`);

  const publicPolys = getThingsFromParties('Paste the polynomial for participant', ourIndex, [...Array(nParties).keys()]);

  publicPolys.set(ourIndex, myPublicPoly);

  const keygen = frost.newKeygen([...publicPolys.values()]);
  const [myShares, myPop] = frost.createShares(keygen, mySecretPoly);

  for (const [i, share] of myShares.entries()) {
    if (i === ourIndex) {
      continue;
    }
    console.log(`Secretly send these to participant ${i}:\nSecret Share: ${JSON.stringify(share)}\nProof-of-Possession: ${JSON.stringify(myPop)}\n`);
  }

  const shares = getThingsFromParties('Paste the Secret Share from participant', ourIndex, [...Array(nParties).keys()]);
  shares.set(ourIndex, myShares[ourIndex]);

  const pops = getThingsFromParties('Paste the Proof-of-Possession from participant', ourIndex, [...Array(nParties).keys()]);
  pops.set(ourIndex, myPop);

  const [secretShare, frostKey] = frost.finishKeygen(
    keygen,
    ourIndex,
    [...shares.values()],
    [...pops.values()]
  );

  const frostKp = new FrostKeyPair(frostKey.intoXonlyKey(), secretShare, ourIndex);

  const frostKeyName = rl.questionSync('Enter a name for this FROST key (saved to file): ');

  fs.writeFileSync(`${frostKeyName}.frost`, JSON.stringify(frostKp));
}

function sign(frostKeypair, message, signingParties) {
  const frost = require('schnorr-fun'); // You may need to install this library
  const rand = require('rand'); // You may need to install this library

  const session_id = crypto.randomBytes(32);
  const nonce_rng = frost.seedNonceRng(frostKeypair.frostKey, frostKeypair.secretShare, session_id);
  const myNonce = frost.genNonce(nonce_rng);

  console.log(`Share your public nonce with the other signers:\n(index ${frostKeypair.ourIndex}): ${JSON.stringify(myNonce.public())}\n\n`);

  const nonces = getThingsFromParties('Paste the Public Nonce from participant', frostKeypair.ourIndex, signingParties);

  nonces.set(frostKeypair.ourIndex, myNonce.public());

  const noncesObj = Array.from(nonces.values());

  const session = frost.startSignSession(frostKeypair.frostKey, noncesObj, message);

  const mySig = frost.sign(
    frostKeypair.frostKey,
    session,
    frostKeypair.ourIndex,
    frostKeypair.secretShare,
    myNonce
  );

  console.log(`Send your Signature Share to all of the other signers:\n(index ${frostKeypair.ourIndex}): ${JSON.stringify(mySig)}\n`);

  const sigShares = getThingsFromParties('Paste the Signature Share from participant', frostKeypair.ourIndex, signingParties);

  if (signingParties.includes(frostKeypair.ourIndex)) {
    sigShares.set(frostKeypair.ourIndex, mySig);
  }

  for (const [i, share] of sigShares) {
    if (i === frostKeypair.ourIndex) {
      continue;
    }
    if (frost.verifySignatureShare(frostKeypair.frostKey, session, i, share)) {
      console.log(`Received and verified the partial signature from participant ${i}`);
    }
  }

  const combinedSig = frost.combineSignatureShares(
    frostKeypair.frostKey,
    session,
    Array.from(sigShares.values())
  );

  if (frost.schnorr.verify(frostKeypair.frostKey.publicKey(), message, combinedSig)) {
    console.log('Final FROST signature verified');
  }

  return combinedSig;
}

class UnsignedEvent {
  constructor(pubkey, kind, tags, content, createdAt) {
    const serializedEvent = JSON.stringify([0, pubkey, createdAt, kind, tags, content]);
    console.log(`This is the FROSTR event to be created: ${serializedEvent}\n`);

    const hash = crypto.createHash('sha256').update(serializedEvent).digest('hex');
    this.id = hash;
    this.pubkey = pubkey;
    this.created_at = createdAt;
    this.kind = kind;
    this.tags = tags;
    this.content = content;
    this.hash_bytes = Buffer.from(hash, 'hex');
  }

  addSignature(signature) {
    return new SignedEvent(this.id, this.pubkey, this.created_at, this.kind, this.tags, this.content, signature);
  }
}

class SignedEvent {
  constructor(id, pubkey, createdAt, kind, tags, content, sig) {
    this.id = id;
    this.pubkey = pubkey;
    this.created_at = createdAt;
    this.kind = kind;
    this.tags = tags;
    this.content = content;
    this.sig = sig;
  }
}

function publishToRelay(relay, message) {
  const client = new WebSocket(relay);

  client.on('open', () => {
    client.send(message);
  });

  client.on('error', (err) => {
    console.error(`Could not send message to relay: ${err}`);
  });
}

function broadcastEvent(event) {
  const eventJson = JSON.stringify(event);
  console.log(eventJson);

  const eventMsg = JSON.stringify(['EVENT', event]);
  console.log(eventMsg);

  const message = eventMsg;
  const relays = [
    'wss://relay.damus.io',
    'wss://nostr.zebedee.cloud',
    'wss://relay.nostr.ch',
    'wss://nostr-pub.wellorder.net',
    'wss://nostr-pub.semisol.dev',
    'wss://nostr.oxtr.dev'
  ];

  for (const relay of relays) {
    publishToRelay(relay, message);
  }
}

function main() {
  while (true) {
    console.log(`
    `);
    console.log('** Extremely unsafe and violently untested **');
    console.log('Note that all indices start from 0.\n');
    const choice = rl.questionSync('Choose an option:\n0) New FROST Keygen\n1) Create FROSTR post\n\nSelection: ');

    if (choice === '0') {
      const nParties = parseInt(rl.questionSync('How many parties will there be? (N): '));
      const threshold = parseInt(rl.questionSync('What will the threshold be? (T where T <= N): '));
      frostKeygen(threshold, nParties);
    } else if (choice === '1') {
      const frostKeyName = rl.questionSync('Type the name of the frost key you wish to use: ');
      const frostKeyStr = fs.readFileSync(`${frostKeyName}.frost`, 'utf-8');
      const frostKeypair = JSON.parse(frostKeyStr);

      const nostrPostStr = rl.questionSync('Enter the nostr message you wish to sign (as a group!): ');
      const eventTime = parseInt(rl.questionSync('Enter the agreed upon unix epoch time for the nostr event: '));

      const signers = [];
      while (signers.length < frostKeypair.frostKey.threshold()) {
        const signerIndex = parseInt(rl.questionSync(`Enter the index of a signer (${frostKeypair.frostKey.threshold() - signers.length} remaining): `));
        signers.push(signerIndex);
      }

      const unsignedFrostrEvent = new UnsignedEvent(
        frostKeypair.frostKey.publicKey(),
        1,
        [],
        nostrPostStr,
        eventTime
      );

      const schnorrMessage = unsignedFrostrEvent.hash_bytes;
      const signature = sign(frostKeypair, schnorrMessage, signers);
      console.log(`Final FROST signature: ${signature}`);

      const frostrEvent = unsignedFrostrEvent.addSignature(signature);

      const response = rl.questionSync('Do you wish to broadcast this event? (y/n): ');
      if (response.toLowerCase() === 'y') {
        broadcastEvent(frostrEvent);
      }
    } else {
      console.error('Invalid choice!');
    }
  }
}

main();
