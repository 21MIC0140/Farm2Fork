import React, { useState } from 'react';
import { QrCode, Sprout, History, Award, AlertCircle, Calendar, MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../services/api';

export const FarmerPortal = () => {
  const [productName, setProductName] = useState('');
  const [plantationDate, setPlantationDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [location, setLocation] = useState('');
  const [generatedQR, setGeneratedQR] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tokenBalance, setTokenBalance] = useState(1250);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [recentActivities, setRecentActivities] = useState([
    {
      id: '1',
      type: 'QR_GENERATED',
      description: 'Generated QR for Organic Carrots',
      timestamp: new Date().toISOString(),
      productName: 'Organic Carrots'
    },
    {
      id: '2',
      type: 'RATING_RECEIVED',
      description: 'Received 5-star rating for Fresh Spinach',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      amount: 50
    }
  ]);

  const farmerId = 'farmer-1';

  const handleGenerateQR = async () => {
    if (!productName || !plantationDate || !harvestDate || !location) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await api.generateQR({
        name: productName,
        plantationDate,
        harvestDate,
        location,
        farmerId
      });

      if (response.success) {
        setGeneratedQR(response.qrData);
        setSuccess('QR Code generated successfully!');
        
        // Update recent activities
        const newActivity = {
          id: Date.now().toString(),
          type: 'QR_GENERATED' as const,
          description: `Generated QR for ${productName}`,
          timestamp: new Date().toISOString(),
          productName: productName
        };
        setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
        
        // Reset form
        setProductName('');
        setPlantationDate('');
        setHarvestDate('');
        setLocation('');
      } else {
        setError('Failed to generate QR code');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemTokens = async () => {
    const amount = parseInt(redeemAmount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amount > tokenBalance) {
      setError('Insufficient token balance');
      return;
    }

    setLoading(true);
    try {
      const response = await api.redeemTokens(farmerId, amount);
      if (response.success) {
        setTokenBalance(response.newBalance);
        setSuccess(`Successfully redeemed ${amount} tokens!`);
        setRedeemAmount('');
        
        // Update recent activities
        const newActivity = {
          id: Date.now().toString(),
          type: 'TOKENS_REDEEMED' as const,
          description: `Redeemed ${amount} tokens`,
          timestamp: new Date().toISOString(),
          amount: amount
        };
        setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      } else {
        setError(response.error || 'Failed to redeem tokens');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Farmer Portal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Manage your farm's digital presence, generate QR codes for your products,
          and track your token earnings in our decentralized agricultural ecosystem.
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

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-full">
                <QrCode className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Generate Product QR Code</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="e.g., Organic Broccoli"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="e.g., Sunshine Organic Farm, Punjab"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plantation Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={plantationDate}
                      onChange={(e) => setPlantationDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harvest Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleGenerateQR}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 font-medium"
              >
                {loading ? 'Generating...' : 'Generate QR Code'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-full">
                <History className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'QR_GENERATED' ? 'bg-green-500' :
                    activity.type === 'RATING_RECEIVED' ? 'bg-yellow-500' :
                    activity.type === 'TOKENS_REDEEMED' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                    {activity.amount && (
                      <p className="text-sm text-green-600 font-medium">
                        +{activity.amount} tokens earned
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {generatedQR && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <QrCode className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Generated QR Code</h2>
              </div>
              <div className="text-center">
                <div className="inline-block p-6 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                  <QRCodeSVG value={generatedQR} size={200} />
                </div>
                <p className="text-center text-sm text-gray-600 mt-4 mb-4">
                  Print this QR code and attach it to your product packaging
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                  <p className="text-xs font-medium text-gray-700 mb-2">QR Code Data:</p>
                  <p className="text-xs text-gray-600 break-all font-mono bg-white p-2 rounded border">
                    {generatedQR}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-lg border border-yellow-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold">Token Balance</h2>
            </div>
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-yellow-600 mb-2">{tokenBalance}</p>
              <p className="text-gray-600 font-medium">Available Tokens</p>
              <p className="text-sm text-gray-500 mt-2">
                Earn tokens through customer ratings and quality products
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Amount to redeem"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              />
              <button
                onClick={handleRedeemTokens}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 font-medium"
              >
                {loading ? 'Processing...' : 'Redeem Tokens'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-full">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Farm Statistics</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">15</p>
                <p className="text-sm text-gray-600">Products Listed</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">1,450</p>
                <p className="text-sm text-gray-600">Total Earnings</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">127</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};