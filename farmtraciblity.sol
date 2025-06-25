pragma solidity ^0.8.0;


contract FoodTraceability { struct Product {
uint id; string name; string origin;
string processDate; string harvestDate; address farmer;
}


struct Farmer {
address farmerAddress; uint tokens;
}


mapping(uint => Product) public products; mapping(address => Farmer) public farmers;

uint public productCount = 0;


event ProductRegistered(uint id, string name, address farmer); event TokensAwarded(address farmer, uint tokens);

function registerProduct(string memory _name, string memory _origin, string memory
_processDate, string memory _harvestDate) public { productCount++;
 
products[productCount] = Product(productCount, _name, _origin, _processDate,
_harvestDate, msg.sender);


// Reward the farmer with tokens farmers[msg.sender].farmerAddress = msg.sender; farmers[msg.sender].tokens += 10;

emit ProductRegistered(productCount, _name, msg.sender); emit TokensAwarded(msg.sender, 10);
}


function getProduct(uint _id) public view returns (uint, string memory, string memory, string memory, string memory, address) {
Product memory p = products[_id];
return (p.id, p.name, p.origin, p.processDate, p.harvestDate, p.farmer);
}


function getFarmerTokens(address _farmer) public view returns (uint) { return farmers[_farmer].tokens;
}
}