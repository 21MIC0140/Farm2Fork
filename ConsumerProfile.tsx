import React, { useState, useEffect } from 'react';
import { Consumer, Product, WalletConnection as WalletType } from '../types';
import { QrCode, History, Star, Wallet, AlertCircle, Coins } from 'lucide-react';
import { api } from '../services/api';
import { WalletConnection } from '../components/WalletConnection';
import { TrackingTimeline } from '../components/TrackingTimeline';

export const ConsumerProfile: React.FC = () => {
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rating, setRating] = useState(5);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  const consumerId = 'consumer-1';

  useEffect(() => {
    const fetchConsumer = async () => {
      try {
        const consumerData = await api.getConsumer(consumerId);
        setConsumer(consumerData);
      } catch (err) {
        setError('Failed to load consumer profile');
        console.error('Consumer fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumer();
  }, [consumerId]);

  const handleScanQR = () => {
    window.location.href = '/scan-qr';
  };

  const handleRateFarmer = async (product: Product) => {
    if (!product.farmerId) {
      setError('No farmer information available for this product');
      return;
    }

    setRatingLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.rateFarmer(product.farmerId, rating, consumerId);
      
      if (response.success) {
        setSuccess(`Successfully rated farmer! They earned ${response.tokensEarned} tokens.`);
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(response.error || 'Failed to rate farmer');
      }
    } catch (err) {
      console.error('Rating error:', err);
      setError('Error connecting to server. Please try again.');
    } finally {
      setRatingLoading(false);
    }
  };

  if (loading && !consumer) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <div className="ml-4 text-lg">Loading consumer profile...</div>
      </div>
    );
  }

  if (!consumer) {
    return (
      <div className="text-center text-red-600 p-8">
        <AlertCircle className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to load consumer profile</h2>
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
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
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
          <AlertCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className="text-green-700">{success}</span>
          <button 
            onClick={() => setSuccess('')}
            className="ml-auto text-green-500 hover:text-green-700 text-xl"
          >
            ×
          </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{consumer.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Wallet className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {consumer.walletAddress.slice(0, 6)}...{consumer.walletAddress.slice(-4)}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <Coins className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Verified Consumer</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowWallet(!showWallet)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Wallet className="w-5 h-5" />
              {wallet?.connected ? 'Wallet Connected' : 'Connect Wallet'}
            </button>
            <button
              onClick={handleScanQR}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <QrCode className="w-5 h-5" />
              Scan QR Code
            </button>
          </div>
        </div>
      </div>

      {showWallet && (
        <div className="mb-8">
          <WalletConnection onWalletConnect={setWallet} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Scanned Products</h2>
          <div className="space-y-4">
            {consumer.scannedProducts && consumer.scannedProducts.length > 0 ? (
              consumer.scannedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer border-2 ${
                    selectedProduct?.id === product.id ? 'border-green-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Scanned on: {new Date().toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">FSSAI Verified</span>
                  </div>
                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    Click to view journey and rate farmer →
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="font-semibold text-lg mb-2">No products scanned yet</h3>
                <p className="mb-4">Start scanning QR codes to track your food's journey</p>
                <button
                  onClick={handleScanQR}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Scan Your First Product
                </button>
              </div>
            )}
          </div>
        </div>

        {selectedProduct && (
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <TrackingTimeline 
                journey={selectedProduct.journey}
                trackingNumber={selectedProduct.trackingNumber}
                currentLocation={selectedProduct.currentLocation}
                estimatedDelivery={selectedProduct.estimatedDelivery}
              />

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">FSSAI Verification</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="font-semibold text-green-800">Verified Product</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Certificate Number:</span>
                      <p className="font-mono font-medium">{selectedProduct.fssaiVerification.certificateNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Verification Date:</span>
                      <p className="font-medium">{new Date(selectedProduct.fssaiVerification.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Rate This Farmer</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How would you rate this farmer's product quality?
                    </label>
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-3xl transition-all duration-200 hover:scale-110 ${
                            star <= rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="ml-3 text-lg font-medium text-gray-700">
                        {rating} star{rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {rating === 5 && "Excellent! This farmer deserves recognition."}
                      {rating === 4 && "Very good quality product."}
                      {rating === 3 && "Good, but could be improved."}
                      {rating === 2 && "Below average quality."}
                      {rating === 1 && "Poor quality, needs improvement."}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRateFarmer(selectedProduct)}
                    disabled={ratingLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    <Star className="w-5 h-5" />
                    {ratingLoading ? 'Submitting Rating...' : 'Submit Rating & Reward Farmer'}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Your rating helps farmers improve and earn tokens for quality products
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};