import { UTXO, Payment, P2TR } from 'bitcoinjs-lib';

const {
  P2TR: {
    Taproot,
    Tapscript,
  },
} = require('bitcoinjs-lib');

const {
  P2TR: {
    Taproot: {
      TapBranch,
      TapLeaf,
    },
  },
} = require('bitcoinjs-lib');

const {
  P2TR: {
    Taproot: {
      TapBranch: {
        TapTweak,
      },
    },
  },
} = require('bitcoinjs-lib');

const {
  P2TR: {
    Taproot: {
      TapBranch: {
        TapTweak: {
          TapTweakAdd,
          TapTweakMul,
        },
      },
    },
  },
} = require('bitcoinjs-lib');