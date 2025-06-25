module.exports = {
  networks: {
    // Development network for local development
    development: {
      host: "127.0.0.1",
      port: 8545, // Changed from 7545 to 8545
      network_id: "*", // Match any network id
      gas: 5500000,
      gasPrice: 20000000000, // 20 gwei
    },
    
    // Test network for testing
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 5500000,
      gasPrice: 20000000000,
    },

    // Mumbai testnet (Polygon)
    mumbai: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 1000000000, // 1 gwei
    },

    // Polygon mainnet
    polygon: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      ),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 1000000000, // 1 gwei
    },

    // Sepolia testnet (Ethereum)
    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      ),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 20000000000, // 20 gwei
    },

    // Ethereum mainnet
    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      ),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 20000000000, // 20 gwei
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "paris"
      }
    }
  },

  // Plugin configuration
  plugins: [
    "truffle-plugin-verify"
  ],

  // API keys for contract verification
  api_keys: {
    polygonscan: process.env.POLYGONSCAN_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  },

  // Contract verification settings
  verify: {
    apiUrl: "https://api.polygonscan.com/api",
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },

  // Migration settings
  migrations_directory: "./migrations",
  contracts_directory: "./contracts",
  contracts_build_directory: "./src/contracts",

  // Test settings
  test_directory: "./test",
  test_file_extension: ".js",

  // Environment variables
  env: {
    development: {
      gas: 5500000,
      gasPrice: 20000000000,
    },
    test: {
      gas: 5500000,
      gasPrice: 20000000000,
    },
    production: {
      gas: 6000000,
      gasPrice: 20000000000,
    }
  }
}; 