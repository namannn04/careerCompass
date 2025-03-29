import { useState, useEffect } from "react";

const AptosWallet = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.aptos) {
      window.aptos.isConnected().then((res) => {
        if (res) {
          window.aptos.account().then(setAccount).catch(setError);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.aptos) throw new Error("Petra Wallet not found");
      const account = await window.aptos.connect();
      setAccount(account);
    } catch (err) {
      setError(err.message);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (!window.aptos) throw new Error("Petra Wallet not found");
      await window.aptos.disconnect();
      setAccount(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold">Aptos Wallet</h1>
        {account ? (
          <div className="mt-4">
            <p className="text-lg">Connected: {account.address}</p>
            <button onClick={disconnectWallet} className="mt-4 bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={connectWallet} className="mt-4 bg-green-500 px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
            Connect Wallet
          </button>
        )}
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AptosWallet;