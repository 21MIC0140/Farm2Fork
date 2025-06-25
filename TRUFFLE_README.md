# Truffle Configuration for Farm2Fork Project

This project includes Truffle configuration for deploying and managing smart contracts for the farming ecosystem.

## Prerequisites

1. **Node.js and npm** (already installed)
2. **Ganache** (for local blockchain development)
3. **MetaMask** (for wallet integration)

## Installation

1. Install Truffle and dependencies:
```bash
npm install
```

2. Install Ganache (if not already installed):
   - Download from: https://trufflesuite.com/ganache/
   - Or install via npm: `npm install -g ganache-cli`

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Ethereum Private Key (for deployment)
PRIVATE_KEY=your_private_key_here

# Infura Project ID
INFURA_PROJECT_ID=your_infura_project_id_here

# API Keys for Contract Verification
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Network Configuration
NETWORK=development

# Gas Settings
GAS_LIMIT=5500000
GAS_PRICE=20000000000

# Contract Settings
CONTRACT_OWNER=your_contract_owner_address_here
```

### Getting API Keys

1. **Infura**: 
   - Go to https://infura.io/
   - Create an account and project
   - Copy your Project ID

2. **PolygonScan**:
   - Go to https://polygonscan.com/
   - Create an account
   - Go to API Keys section
   - Create a new API key

3. **Etherscan**:
   - Go to https://etherscan.io/
   - Create an account
   - Go to API Keys section
   - Create a new API key

## Smart Contracts

### FarmToken.sol

The main ERC-20 token contract for the farming ecosystem:

- **Token Name**: FarmToken
- **Token Symbol**: FARM
- **Initial Supply**: 1,000,000 tokens
- **Decimals**: 18

#### Features:
- Farmer rating rewards (10 tokens per star)
- Product quality rewards (50 tokens per product)
- Token spending and redemption
- Pause/unpause functionality
- Rating statistics tracking

## Available Scripts

### Development

```bash
# Compile contracts
npm run truffle:compile

# Run tests
npm run truffle:test

# Open Truffle console
npm run truffle:console

# Deploy to local network (Ganache)
npm run truffle:deploy:development

# Reset and redeploy
npm run truffle:migrate:reset
```

### Testnets

```bash
# Deploy to Mumbai testnet (Polygon)
npm run truffle:deploy:mumbai

# Deploy to Sepolia testnet (Ethereum)
npm run truffle:deploy:sepolia
```

### Mainnet

```bash
# Deploy to Polygon mainnet
npm run truffle:deploy:polygon

# Deploy to Ethereum mainnet
npm run truffle:deploy:mainnet
```

### Contract Verification

```bash
# Verify contracts on block explorer
npm run truffle:verify
```

## Networks Configuration

### Development Network
- **Host**: 127.0.0.1
- **Port**: 7545 (Ganache default)
- **Network ID**: *
- **Gas**: 5,500,000
- **Gas Price**: 20 Gwei

### Mumbai Testnet (Polygon)
- **Network ID**: 80001
- **RPC URL**: https://polygon-mumbai.infura.io/v3/{PROJECT_ID}
- **Block Explorer**: https://mumbai.polygonscan.com/

### Polygon Mainnet
- **Network ID**: 137
- **RPC URL**: https://polygon-mainnet.infura.io/v3/{PROJECT_ID}
- **Block Explorer**: https://polygonscan.com/

### Sepolia Testnet (Ethereum)
- **Network ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/{PROJECT_ID}
- **Block Explorer**: https://sepolia.etherscan.io/

### Ethereum Mainnet
- **Network ID**: 1
- **RPC URL**: https://mainnet.infura.io/v3/{PROJECT_ID}
- **Block Explorer**: https://etherscan.io/

## Getting Started

1. **Start Ganache**:
   - Open Ganache application
   - Or run: `ganache-cli --port 7545`

2. **Compile Contracts**:
```bash
npm run truffle:compile
```

3. **Deploy to Local Network**:
```bash
npm run truffle:deploy:development
```

4. **Run Tests**:
```bash
npm run truffle:test
```

## Contract Integration

After deployment, the contract address and ABI will be saved to:
- `./src/contracts/FarmToken.json`

You can integrate this with your React frontend using Web3.js or ethers.js.

## Example Frontend Integration

```javascript
import Web3 from 'web3';
import FarmToken from './contracts/FarmToken.json';

// Connect to Web3
const web3 = new Web3(window.ethereum);

// Get contract instance
const farmToken = new web3.eth.Contract(
  FarmToken.abi,
  FarmToken.networks[networkId].address
);

// Get token balance
const balance = await farmToken.methods.balanceOf(userAddress).call();

// Reward farmer for rating
await farmToken.methods.rewardFarmerForRating(farmerAddress, 5).send({
  from: ownerAddress
});
```

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Environment Variables**: Use `.env` files for sensitive data
3. **Gas Limits**: Set appropriate gas limits for each network
4. **Contract Verification**: Always verify contracts on block explorers
5. **Testing**: Run comprehensive tests before mainnet deployment

## Troubleshooting

### Common Issues

1. **"Network not found"**: Make sure Ganache is running on the correct port
2. **"Insufficient funds"**: Ensure your account has enough ETH/MATIC for gas
3. **"Contract not found"**: Recompile contracts after making changes
4. **"Gas estimation failed"**: Check gas limits and contract logic

### Getting Help

- [Truffle Documentation](https://trufflesuite.com/docs/)
- [OpenZeppelin Documentation](https://docs.openzeppelin.com/)
- [Web3.js Documentation](https://web3js.org/docs/)

## License

This project is licensed under the MIT License. 