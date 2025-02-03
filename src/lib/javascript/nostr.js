import { Npub, Nsec,  Relay } from "nostr-tools";

const relay = new Relay("wss://relay.damus.io");

relay.on("connect", () => {
    console.log("Connected to relay");
});

relay.on("disconnect", () => {
    console.log("Disconnected from relay");
});

const Npub = new Npub(relay);
const Nsec = new Nsec(relay);

export { Npub, Relay };
