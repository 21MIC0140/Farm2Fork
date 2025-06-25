const FarmToken = artifacts.require("FarmToken");

module.exports = function(deployer, network, accounts) {
  // Deploy the FarmToken contract
  deployer.deploy(FarmToken).then(function(instance) {
    console.log("FarmToken deployed at:", instance.address);
    
    // Log deployment information
    console.log("Network:", network);
    console.log("Deployer:", accounts[0]);
    console.log("Initial supply: 1,000,000 FARM tokens");
    console.log("Token name: FarmToken");
    console.log("Token symbol: FARM");
    
    // Store contract address for frontend integration
    const fs = require('fs');
    const contractData = {
      network: network,
      address: instance.address,
      deployer: accounts[0],
      deploymentTime: new Date().toISOString(),
      tokenName: "FarmToken",
      tokenSymbol: "FARM",
      initialSupply: "1000000"
    };
    
    // Create contracts directory if it doesn't exist
    if (!fs.existsSync('./src/contracts')) {
      fs.mkdirSync('./src/contracts', { recursive: true });
    }
    
    // Write deployment data to a JSON file
    fs.writeFileSync(
      './src/contracts/FarmToken.json',
      JSON.stringify(contractData, null, 2)
    );
    
    console.log("Contract deployment data saved to: ./src/contracts/FarmToken.json");
  });
}; 