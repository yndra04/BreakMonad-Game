import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/config";

export default function ClickGame() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(false);

  // Connect to Metamask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        setAccount(address);
        setProvider(provider);
        setContract(contractInstance);

        // Fetch initial clicks
        const clicksCount = await contractInstance.getClicks(address);
        setClicks(clicksCount.toNumber());
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Metamask not detected! Please install Metamask.");
    }
  };

  // Click function
  const handleClick = async () => {
    if (!contract) return alert("Connect wallet first!");
    try {
      setLoading(true);
      const tx = await contract.click();
      await tx.wait(); // Wait for transaction confirmation
      const updatedClicks = await contract.getClicks(account);
      setClicks(updatedClicks.toNumber());
      setLoading(false);
    } catch (error) {
      console.error("Transaction failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">ClickBreaker Game</h1>
      <p className="mt-2 text-lg">Click to increase your score on-chain!</p>

      {account ? (
        <>
          <p className="mt-4 text-lg">Wallet: {account}</p>
          <p className="mt-2 text-lg">Clicks: {clicks}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Processing..." : "Click Me!"}
          </button>
        </>
      ) : (
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
