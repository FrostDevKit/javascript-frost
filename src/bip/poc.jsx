import { TinySecp256k1Interface } from "bitcoinjs-lib/src/types";
import { Secp256k1Interface } from "bitcoinjs-lib/src/interfaces/ecpair";

export const NETWORK = {
  name: "testnet",
  messagePrefix: "\x18Bitcoin Signed Message:\n",
  bech32: "bc",
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef,

};

export const Secp256k1Interface: Secp256k1Interface = new TinySecp256k1Interface();

export const TinySecp256k1Interface = Secp256k1Interface;


