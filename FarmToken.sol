// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title FarmToken
 * @dev ERC-20 token for the farming ecosystem
 * Farmers can earn tokens through ratings and quality products
 * Consumers can spend tokens on products and tools
 */
contract FarmToken is ERC20, Ownable, Pausable {
    
    // Events
    event TokensRewarded(address indexed farmer, uint256 amount, string reason);
    event TokensSpent(address indexed user, uint256 amount, string reason);
    event TokensRedeemed(address indexed user, uint256 amount);
    
    // Mapping to track farmer ratings
    mapping(address => uint256) public farmerRatings;
    
    // Mapping to track total ratings per farmer
    mapping(address => uint256) public farmerTotalRatings;
    
    // Token reward rates
    uint256 public constant RATING_REWARD_RATE = 10; // 10 tokens per star rating
    uint256 public constant PRODUCT_REWARD_RATE = 50; // 50 tokens per quality product
    
    constructor() ERC20("FarmToken", "FARM") Ownable() {
        // Initial supply: 1,000,000 tokens
        _mint(msg.sender, 1000000 * 10**decimals());
    }
    
    /**
     * @dev Reward tokens to a farmer based on rating
     * @param farmer Address of the farmer
     * @param rating Rating given (1-5 stars)
     */
    function rewardFarmerForRating(address farmer, uint256 rating) external onlyOwner whenNotPaused {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        require(farmer != address(0), "Invalid farmer address");
        
        uint256 rewardAmount = rating * RATING_REWARD_RATE * 10**decimals();
        
        // Update farmer rating statistics
        farmerRatings[farmer] += rating;
        farmerTotalRatings[farmer] += 1;
        
        // Transfer tokens to farmer
        _transfer(owner(), farmer, rewardAmount);
        
        emit TokensRewarded(farmer, rewardAmount, "Rating reward");
    }
    
    /**
     * @dev Reward tokens to a farmer for quality product
     * @param farmer Address of the farmer
     * @param productName Name of the product
     */
    function rewardFarmerForProduct(address farmer, string memory productName) external onlyOwner whenNotPaused {
        require(farmer != address(0), "Invalid farmer address");
        
        uint256 rewardAmount = PRODUCT_REWARD_RATE * 10**decimals();
        
        // Transfer tokens to farmer
        _transfer(owner(), farmer, rewardAmount);
        
        emit TokensRewarded(farmer, rewardAmount, string(abi.encodePacked("Quality product: ", productName)));
    }
    
    /**
     * @dev Allow users to spend tokens on products or tools
     * @param amount Amount of tokens to spend
     * @param reason Reason for spending
     */
    function spendTokens(uint256 amount, string memory reason) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");
        
        // Burn tokens (remove from circulation)
        _burn(msg.sender, amount);
        
        emit TokensSpent(msg.sender, amount, reason);
    }
    
    /**
     * @dev Allow users to redeem tokens for fiat or other rewards
     * @param amount Amount of tokens to redeem
     */
    function redeemTokens(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");
        
        // Transfer tokens back to owner (for redemption processing)
        _transfer(msg.sender, owner(), amount);
        
        emit TokensRedeemed(msg.sender, amount);
    }
    
    /**
     * @dev Get average rating for a farmer
     * @param farmer Address of the farmer
     * @return Average rating (0 if no ratings)
     */
    function getFarmerAverageRating(address farmer) external view returns (uint256) {
        uint256 totalRatings = farmerTotalRatings[farmer];
        if (totalRatings == 0) return 0;
        return farmerRatings[farmer] / totalRatings;
    }
    
    /**
     * @dev Pause token transfers (emergency function)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer function to check for paused state
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused(), "Token transfer paused");
    }
} 