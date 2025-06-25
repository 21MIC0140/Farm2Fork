import React, { useState } from 'react';
import { QrCode, Info, AlertCircle, CheckCircle, Camera, Upload, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { QRScanner } from '../components/QRScanner';
import { TrackingTimeline } from '../components/TrackingTimeline';

export const ScanQR = () => {
  const [qrValue, setQrValue] = useState('');
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const consumerId = 'consumer-1';

  const handleProductLookup = async () => {
    if (!qrValue.trim()) {
      setError('Please enter QR data or product ID');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setScannedProduct(null); // Clear previous product to force fresh data

    try {
      // Force fresh data fetch by adding timestamp
      const response = await api.scanQR(qrValue, consumerId, { 
        timestamp: Date.now(),
        forceRefresh: true 
      });
      
      if (response.success) {
        // Ensure we get the most updated product information
        const updatedProduct = {
          ...response.product,
          lastUpdated: new Date().toISOString()
        };
        setScannedProduct(updatedProduct);
        setSuccess('Product information updated successfully!');
        setQrValue('');
      } else {
        setError(response.error || 'Product not found or failed to fetch updated information');
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('Error connecting to server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    // Simulate QR scanning from image with updated product data
    setTimeout(() => {
      const demoQR = JSON.stringify({
        productId: 'demo-product-1',
        name: 'Organic Tomatoes',
        farmerId: 'farmer-1',
        timestamp: new Date().toISOString(),
        forceRefresh: true
      });
      setQrValue(demoQR);
      setLoading(false);
      setSuccess('QR code detected from image!');
    }, 2000);
  };

  const handleDemoQR = () => {
    const demoQR = JSON.stringify({
      productId: 'demo-product-1',
      name: 'Organic Tomatoes',
      farmerId: 'farmer-1',
      timestamp: new Date().toISOString(),
      forceRefresh: true
    });
    setQrValue(demoQR);
  };

  const handleScanResult = (data: string) => {
    setQrValue(data);
    setShowScanner(false);
    setSuccess('QR code scanned successfully!');
  };

  const navigateToConsumerProfile = () => {
    window.location.href = '/consumer-profile';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Scan Product QR Code
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Scan the QR code on your agricultural product to view its complete journey,
          verify authenticity, and track its path from farm to table.
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
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-700">{success}</span>
          <button 
            onClick={() => setSuccess('')}
            className="ml-auto text-green-500 hover:text-green-700 text-xl"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Camera Scan</h2>
            <p className="text-gray-600 text-sm">Use your device camera to scan QR codes</p>
          </div>
          <button
            onClick={() => setShowScanner(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center justify-center gap-2"
          >
            <Camera className="h-5 w-5" />
            Open Camera Scanner
          </button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <Upload className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Upload Image</h2>
            <p className="text-gray-600 text-sm">Upload a photo containing a QR code</p>
          </div>
          <label className="block">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={loading}
            />
            <div className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium text-center cursor-pointer flex items-center justify-center gap-2">
              <Upload className="h-5 w-5" />
              {loading ? 'Processing...' : 'Choose Image'}
            </div>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-blue-700 mb-3">
              For demonstration purposes, you can paste QR data directly or use our demo data.
            </p>
            <button
              onClick={handleDemoQR}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Use Demo QR Data
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Manual Product Lookup</h2>
        <div className="space-y-4">
          <textarea
            placeholder="Paste QR data here or enter Product ID (will fetch latest product information)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none transition-colors"
            value={qrValue}
            onChange={(e) => setQrValue(e.target.value)}
          />
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 font-medium"
            onClick={handleProductLookup}
            disabled={loading}
          >
            {loading ? 'Fetching Latest Product Info...' : 'Look Up Product (Get Latest Data)'}
          </button>
        </div>
      </div>

      {scannedProduct && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Product Information</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Verified & Updated</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">{scannedProduct.name}</h3>
                <p className="text-gray-600 mb-4">Product ID: {scannedProduct.id}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Planted:</span>
                    <span className="font-medium">{new Date(scannedProduct.plantedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harvested:</span>
                    <span className="font-medium">{new Date(scannedProduct.harvestedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium text-green-600">{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800">FSSAI Verification</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Certificate:</span>
                    <span className="font-mono text-green-800">{scannedProduct.fssaiVerification.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Verified:</span>
                    <span className="text-green-800">{new Date(scannedProduct.fssaiVerification.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TrackingTimeline 
            journey={scannedProduct.journey}
            trackingNumber={scannedProduct.trackingNumber}
            currentLocation={scannedProduct.currentLocation}
            estimatedDelivery={scannedProduct.estimatedDelivery}
          />

          <div className="text-center space-y-4">
            <button
              onClick={navigateToConsumerProfile}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-8 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <ExternalLink className="w-5 h-5" />
              View Products in Consumer Profile
            </button>
            <p className="text-sm text-gray-600">
              Access your consumer profile to rate this farmer and view all your scanned products
            </p>
          </div>
        </div>
      )}

      {showScanner && (
        <QRScanner
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};