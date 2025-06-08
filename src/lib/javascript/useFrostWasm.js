/**
 * Example of using the FROST WASM module.
 */

// Adjust the path to where you placed the frost_wasm_example.js file
// The `init` function is the default export, and `generate_frost_keypair` is a named export.
import init, { generate_frost_keypair } from '../frost-module/frost_wasm_example.js';

/**
 * Initializes the WASM module and demonstrates calling a FROST function.
 */
export async function demonstrateFrostKeyGeneration() {
  try {
    // Initialize the WASM module. This needs to be called once.
    // The `init` function might optionally take the URL of the .wasm file
    // if your bundler/environment doesn't automatically locate it next to the .js file.
    // For `wasm-pack --target web` output, it usually finds it automatically.
    await init();

    console.log('FROST WASM module initialized.');

    // Call the exported Rust function.
    const keypair = generate_frost_keypair();

    console.log('Generated FROST Keypair via WASM:');
    console.log('  Secret Key (hex):', keypair.secret_key);
    console.log('  Public Key (hex):', keypair.public_key);

    return keypair;
  } catch (error) {
    console.error('Error using FROST WASM module:', error);
    throw error;
  }
}

// To run this example (e.g., from your main index.js or another script):
// demonstrateFrostKeyGeneration().catch(err => console.error("Failed to run WASM demo:", err));