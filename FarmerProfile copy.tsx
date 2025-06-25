import React, { useState, useEffect } from 'react';
import { Farmer, FarmingTool } from '../types';
import { Coins, Sprout, Star, Package, Store, Wallet, History, AlertCircle, Award, TrendingUp } from 'lucide-react';
import { api } from '../services/api';

export const FarmerProfile: React.FC = () => {
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [tools, setTools] = useState<FarmingTool[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const farmerId = 'farmer-1';
  
  // Updated product images
  const productImages = [
    'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg', // Fresh vegetables
    'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg', // Green leafy vegetables
    'https://images.pexels.com/photos/1580267/pexels-photo-1580267.jpeg', // Colorful peppers
    'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg', // Fresh carrots
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmerData, toolsData] = await Promise.all([
          api.getFarmer(farmerId),
          api.getTools()
        ]);
        setFarmer(farmerData);
        setTools(toolsData.slice(0, 6)); // Show first 6 tools
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [farmerId]);

  const handlePurchaseTool = async (toolId: string) => {
    if (!farmer) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await api.purchaseTool(farmerId, toolId);
      if (response.success) {
        setSuccess(response.message);
        setFarmer(prev => prev ? { ...prev, tokens: response.newBalance } : null);
        const updatedFarmer = await api.getFarmer(farmerId);
        setFarmer(updatedFarmer);
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(response.error || 'Failed to purchase tool');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !farmer) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <div className="ml-4 text-lg">Loading farmer profile...</div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="text-center text-red-600 p-8">
        <AlertCircle className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to load farmer profile</h2>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 mb-6">
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 mb-6">
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

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={farmer.profileImage}
            alt={farmer.name}
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{farmer.name}</h1>
            <p className="text-gray-600 text-lg mt-1">{farmer.location}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{farmer.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Verified Farmer</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Wallet className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-mono">
                {farmer.walletAddress.slice(0, 6)}...{farmer.walletAddress.slice(-4)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-3 justify-end mb-3">
              <Coins className="w-8 h-8 text-yellow-600" />
              <div>
                <span className="text-3xl font-bold text-gray-900">{farmer.tokens}</span>
                <p className="text-gray-600 text-sm">tokens</p>
              </div>
            </div>
            <button
              onClick={() => setShowTransactions(!showTransactions)}
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              <History className="w-4 h-4" />
              {showTransactions ? 'Hide' : 'View'} Transactions
            </button>
          </div>
        </div>

        {showTransactions && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmer.transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow border"
                >
                  <div>
                    <span className={`font-semibold text-lg ${
                      tx.type === 'RECEIVED' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'RECEIVED' ? '+' : '-'}{tx.amount} tokens
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{tx.description}</p>
                    <p className="text-xs text-gray-500">
                      {tx.type === 'RECEIVED' ? `From: ${tx.from}` : `To: ${tx.to}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Sprout className="w-6 h-6 text-green-600" />
            Active Products
          </h2>
          <div className="space-y-4">
            {farmer.products.length > 0 ? (
              farmer.products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-700">Active</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Harvested: {new Date(product.harvestedDate).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">
                      FSSAI Verified: {product.fssaiVerification.certificateNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      {product.journey.length} tracking stages completed
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <Sprout className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="font-semibold text-lg mb-2">No products listed yet</h3>
                <p className="mb-4">Generate QR codes in the Farmer Portal to start tracking your products.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Store className="w-6 h-6 text-blue-600" />
            Premium Farming Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={`https://images.pexels.com/photos/${[
                      '1108572', // Farming equipment
                      '1108101', // Agricultural tools
                      '1108093', // Farm machinery
                      '1108117', // Irrigation system
                      '1108572', // Tools
                      '1108101'  // Equipment
                    ][index % 6]}/pexels-photo-${[
                      '1108572',
                      '1108101', 
                      '1108093',
                      '1108117',
                      '1108572',
                      '1108101'
                    ][index % 6]}.jpeg`}
                    alt={tool.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                    ⭐ {tool.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-yellow-600" />
                      <span className="font-bold text-lg">{tool.tokenPrice}</span>
                    </div>
                    <button
                      onClick={() => handlePurchaseTool(tool.id)}
                      disabled={!tool.available || farmer.tokens < tool.tokenPrice || loading}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    >
                      {loading ? 'Processing...' : 'Purchase'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};