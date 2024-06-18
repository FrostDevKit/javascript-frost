const { ChaCha20RNG } = require('tapscript');
const { P2TR } = require('tapscript');

class Tapscript {
    constructor(seed) {
        this.rng = new ChaCha20RNG(seed);
        this.p2tr = new P2TR(this.rng);
    }
}

module.exports = {
    Tapscript
};

