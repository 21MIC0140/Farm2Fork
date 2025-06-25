import React, { useState, useEffect } from 'react';
import { ShoppingCart, Tag, Package, AlertCircle, Star, Filter, Search, Coins } from 'lucide-react';
import { FarmingTool } from '../types';
import { api } from '../services/api';

export const Store = () => {
  const [tools, setTools] = useState<FarmingTool[]>([]);
  const [filteredTools, setFilteredTools] = useState<FarmingTool[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tokenBalance, setTokenBalance] = useState(1250);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const farmerId = 'farmer-1';

  const categories = ['All', 'Irrigation', 'Fertilizers', 'Planting', 'Testing', 'Automation', 'Protection'];

  // Updated tool images for better variety
  const toolImages = [
    'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg', // Tractor
    'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg', // Farm equipment
    'https://images.pexels.com/photos/1108093/pexels-photo-1108093.jpeg', // Irrigation
    'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg', // Farming tools
    'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg',   // Agricultural machinery
    'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg', // Modern farming
    'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg', // Harvest equipment
    'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg', // Field tools
  ];

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const toolsData = await api.getTools();
        // Update tool images
        const updatedTools = toolsData.map((tool, index) => ({
          ...tool,
          image: toolImages[index % toolImages.length]
        }));
        setTools(updatedTools);
        setFilteredTools(updatedTools);
        
        const farmerData = await api.getFarmer(farmerId);
        setTokenBalance(farmerData.tokens);
      } catch (err) {
        setError('Failed to load store data');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [farmerId]);

  useEffect(() => {
    let filtered = tools;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.tokenPrice - b.tokenPrice;
        case 'price-high':
          return b.tokenPrice - a.tokenPrice;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredTools(filtered);
  }, [tools, searchTerm, selectedCategory, sortBy]);

  const addToCart = (toolId: string) => {
    if (!cart.includes(toolId)) {
      setCart([...cart, toolId]);
      setSuccess('Item added to cart!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const removeFromCart = (toolId: string) => {
    setCart(cart.filter(id => id !== toolId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, toolId) => {
      const tool = tools.find(t => t.id === toolId);
      return total + (tool?.tokenPrice || 0);
    }, 0);
  };

  const handlePurchase = async (toolId: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.purchaseTool(farmerId, toolId);
      if (response.success) {
        setSuccess(response.message);
        setTokenBalance(response.newBalance);
        removeFromCart(toolId);
      } else {
        setError(response.error || 'Failed to purchase item');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const cartItems = cart.map(id => tools.find(t => t.id === id)).filter(Boolean) as FarmingTool[];

  if (loading && tools.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <div className="ml-4 text-lg">Loading store...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Farming Tools Store</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Discover high-quality farming equipment and supplies. Redeem your earned tokens 
          for tools that will enhance your agricultural productivity and sustainability.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
          <button 
            onClick={() => setError('')}
            className="ml-auto text-red-500 hover:text-red-700 text-xl"
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-700">{success}</span>
          <button 
            onClick={() => setSuccess('')}
            className="ml-auto text-green-500 hover:text-green-700 text-xl"
          >
            ×
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <Coins className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-700">Balance:</span>
              <span className="text-green-800 font-bold text-lg">{tokenBalance} Tokens</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-700">Cart:</span>
              <span className="text-blue-800 font-bold">{cart.length} items</span>
              {cart.length > 0 && (
                <span className="text-sm text-blue-600">
                  ({getCartTotal()} tokens)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </h2>
          <div className="space-y-3">
            {cartItems.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={tool.image} alt={tool.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-medium text-lg">{tool.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Coins className="h-4 w-4" />
                      {tool.tokenPrice} tokens
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePurchase(tool.id)}
                    disabled={loading || tokenBalance < tool.tokenPrice}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    {loading ? 'Processing...' : 'Purchase'}
                  </button>
                  <button
                    onClick={() => removeFromCart(tool.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="flex items-center gap-1">
                  <Coins className="h-5 w-5 text-yellow-600" />
                  {getCartTotal()} tokens
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-sm font-medium shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{tool.rating}</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {tool.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{tool.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Coins className="h-5 w-5 text-yellow-600" />
                  <span className="text-xl font-bold text-gray-900">{tool.tokenPrice}</span>
                  <span className="text-sm text-gray-600">tokens</span>
                </div>
                <div className="text-sm text-gray-500">
                  {tool.reviews} reviews
                </div>
              </div>

              <button
                onClick={() => addToCart(tool.id)}
                disabled={!tool.available || cart.includes(tool.id)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {cart.includes(tool.id) ? 'In Cart' : !tool.available ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No tools found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Package className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Quality Guarantee</h3>
            <p className="text-sm text-blue-700">
              All products are carefully selected to ensure quality and durability.
              Free delivery is included with every purchase, and we offer a 30-day satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};