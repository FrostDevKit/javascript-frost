import { Bitcoin, Testnet, Regtest, Signet } from 'bitcoinjs-lib';

const netwok = {
    bitcoin: Bitcoin,
    testnet: Testnet,
    regtest: Regtest,
    signet: Signet
}

export default netwok;