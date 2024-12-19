## BIP for Frost

Bitcoin Improvement Proposal for Frost 

[Frost Unique Key - BIP Proposal](https://github.com/FrostDevKit/BIP-frost)

## Proposal

This BIP proposes the integration of the FROST (Flexible Round-Optimized Schnorr Threshold) signature scheme into the Bitcoin protocol. FROST provides efficient and secure threshold signatures, leveraging a group G of prime order q with a hard Decisional Diffie-Hellman problem. The proposal assumes the existence of a generator g in G and employs a cryptographic hash function H mapping to Z∗q.