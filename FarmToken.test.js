const FarmToken = artifacts.require("FarmToken");

contract("FarmToken", function(accounts) {
  let farmToken;
  const owner = accounts[0];
  const farmer = accounts[1];
  const consumer = accounts[2];
  
  beforeEach(async function() {
    farmToken = await FarmToken.new({ from: owner });
  });

  describe("Basic Token Functions", function() {
    it("should have correct name and symbol", async function() {
      const name = await farmToken.name();
      const symbol = await farmToken.symbol();
      const decimals = await farmToken.decimals();
      
      assert.equal(name, "FarmToken", "Token name should be FarmToken");
      assert.equal(symbol, "FARM", "Token symbol should be FARM");
      assert.equal(decimals.toString(), "18", "Token decimals should be 18");
    });

    it("should have correct initial supply", async function() {
      const totalSupply = await farmToken.totalSupply();
      const expectedSupply = web3.utils.toWei("1000000", "ether");
      
      assert.equal(totalSupply.toString(), expectedSupply, "Initial supply should be 1,000,000 tokens");
    });

    it("should assign initial supply to owner", async function() {
      const ownerBalance = await farmToken.balanceOf(owner);
      const expectedSupply = web3.utils.toWei("1000000", "ether");
      
      assert.equal(ownerBalance.toString(), expectedSupply, "Owner should have initial supply");
    });
  });

  describe("Farmer Rating Rewards", function() {
    it("should reward farmer for rating", async function() {
      const initialBalance = await farmToken.balanceOf(farmer);
      const rating = 5;
      const expectedReward = rating * 10 * 10**18; // 5 * 10 tokens
      
      await farmToken.rewardFarmerForRating(farmer, rating, { from: owner });
      
      const finalBalance = await farmToken.balanceOf(farmer);
      const balanceIncrease = finalBalance.sub(initialBalance);
      
      assert.equal(balanceIncrease.toString(), expectedReward.toString(), "Farmer should receive correct reward");
    });

    it("should update farmer rating statistics", async function() {
      const rating = 4;
      
      await farmToken.rewardFarmerForRating(farmer, rating, { from: owner });
      
      const totalRating = await farmToken.farmerRatings(farmer);
      const totalRatings = await farmToken.farmerTotalRatings(farmer);
      const averageRating = await farmToken.getFarmerAverageRating(farmer);
      
      assert.equal(totalRating.toString(), rating.toString(), "Total rating should be updated");
      assert.equal(totalRatings.toString(), "1", "Total ratings count should be 1");
      assert.equal(averageRating.toString(), rating.toString(), "Average rating should be correct");
    });

    it("should reject invalid ratings", async function() {
      try {
        await farmToken.rewardFarmerForRating(farmer, 0, { from: owner });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert(error.message.includes("Rating must be between 1 and 5"), "Should reject rating 0");
      }
      
      try {
        await farmToken.rewardFarmerForRating(farmer, 6, { from: owner });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert(error.message.includes("Rating must be between 1 and 5"), "Should reject rating 6");
      }
    });

    it("should only allow owner to reward farmers", async function() {
      try {
        await farmToken.rewardFarmerForRating(farmer, 5, { from: consumer });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert(error.message.includes("Ownable"), "Should only allow owner to reward");
      }
    });
  });

  describe("Product Rewards", function() {
    it("should reward farmer for quality product", async function() {
      const initialBalance = await farmToken.balanceOf(farmer);
      const expectedReward = 50 * 10**18; // 50 tokens
      
      await farmToken.rewardFarmerForProduct(farmer, "Organic Tomatoes", { from: owner });
      
      const finalBalance = await farmToken.balanceOf(farmer);
      const balanceIncrease = finalBalance.sub(initialBalance);
      
      assert.equal(balanceIncrease.toString(), expectedReward.toString(), "Farmer should receive product reward");
    });
  });

  describe("Token Spending", function() {
    beforeEach(async function() {
      // Transfer some tokens to consumer for testing
      await farmToken.transfer(consumer, web3.utils.toWei("1000", "ether"), { from: owner });
    });

    it("should allow users to spend tokens", async function() {
      const initialBalance = await farmToken.balanceOf(consumer);
      const spendAmount = web3.utils.toWei("100", "ether");
      
      await farmToken.spendTokens(spendAmount, "Purchased farming tools", { from: consumer });
      
      const finalBalance = await farmToken.balanceOf(consumer);
      const balanceDecrease = initialBalance.sub(finalBalance);
      
      assert.equal(balanceDecrease.toString(), spendAmount.toString(), "Tokens should be spent correctly");
    });

    it("should reject spending more tokens than balance", async function() {
      const spendAmount = web3.utils.toWei("2000", "ether"); // More than balance
      
      try {
        await farmToken.spendTokens(spendAmount, "Test", { from: consumer });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert(error.message.includes("Insufficient token balance"), "Should reject insufficient balance");
      }
    });
  });

  describe("Token Redemption", function() {
    beforeEach(async function() {
      // Transfer some tokens to consumer for testing
      await farmToken.transfer(consumer, web3.utils.toWei("1000", "ether"), { from: owner });
    });

    it("should allow users to redeem tokens", async function() {
      const initialBalance = await farmToken.balanceOf(consumer);
      const initialOwnerBalance = await farmToken.balanceOf(owner);
      const redeemAmount = web3.utils.toWei("500", "ether");
      
      await farmToken.redeemTokens(redeemAmount, { from: consumer });
      
      const finalBalance = await farmToken.balanceOf(consumer);
      const finalOwnerBalance = await farmToken.balanceOf(owner);
      
      assert.equal(initialBalance.sub(finalBalance).toString(), redeemAmount.toString(), "Consumer tokens should be reduced");
      assert.equal(finalOwnerBalance.sub(initialOwnerBalance).toString(), redeemAmount.toString(), "Owner should receive redeemed tokens");
    });
  });

  describe("Pause Functionality", function() {
    it("should allow owner to pause and unpause", async function() {
      await farmToken.pause({ from: owner });
      assert(await farmToken.paused(), "Contract should be paused");
      
      await farmToken.unpause({ from: owner });
      assert(!(await farmToken.paused()), "Contract should be unpaused");
    });

    it("should prevent transfers when paused", async function() {
      await farmToken.pause({ from: owner });
      
      try {
        await farmToken.transfer(consumer, web3.utils.toWei("100", "ether"), { from: owner });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert(error.message.includes("Token transfer paused"), "Should prevent transfers when paused");
      }
    });

    it("should only allow owner to pause", async function() {
      try {
        await farmToken.pause({ from: consumer });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert(error.message.includes("Ownable"), "Should only allow owner to pause");
      }
    });
  });
}); 