import React, { useState } from 'react';
import { Wallet, Send, Copy, CheckCircle } from 'lucide-react';
import { useFarmToken } from "../services/useFarmToken";
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletConnectionProps {
  onWalletConnect: (wallet: any) => void;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({ onWalletConnect }) => {
  const { contract, account } = useFarmToken();
  const [showMenu, setShowMenu] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState<string>("");

  React.useEffect(() => {
    const fetchBalance = async () => {
      if (contract && account) {
        const bal = await contract.balanceOf(account);
        setBalance(bal.toString());
      }
    };
    fetchBalance();
  }, [contract, account]);

  const connectWallet = () => {
    // Now handled by useFarmToken
  };

  const disconnectWallet = () => {
    // Optionally, you can clear state or reload the page
    window.location.reload();
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendTokens = async () => {
    if (!sendAmount || !sendAddress || !contract) {
      alert('Please enter both amount and address');
      return;
    }
    setIsSending(true);
    try {
      const tx = await contract.transfer(sendAddress, ethers.parseUnits(sendAmount, 18));
      await tx.wait();
      setTransactionHash(tx.hash);
      setSendAmount('');
      setSendAddress('');
      setIsSending(false);
      setTimeout(() => {
        setShowSendModal(false);
        setTransactionHash('');
      }, 3000);
    } catch (err) {
      alert('Transaction failed');
      setIsSending(false);
    }
  };

  if (!account) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="text-center">
          <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">Connect your wallet to access all features</p>
          <button
            onClick={async () => await window.ethereum.request({ method: "eth_requestAccounts" })}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Wallet Connected</h3>
              <p className="text-sm text-gray-600">{balance} FARM</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => {
                    setShowSendModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Tokens
                </button>
                <button
                  onClick={copyAddress}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
                <hr className="my-1" />
                <button
                  onClick={disconnectWallet}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Address:</span>
            <span className="text-sm font-mono text-gray-900">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>
        </div>
      </div>
      {/* Send Tokens Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Send Tokens</h3>
            {!transactionHash ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (FARM)
                    </label>
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.1"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowSendModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendTokens}
                    disabled={isSending}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isSending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-4" />
                <p className="text-green-700 font-semibold mb-2">Transaction Sent!</p>
                <p className="text-xs text-gray-500 break-all">Hash: {transactionHash}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};