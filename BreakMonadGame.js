import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";

const MONAD_CHAIN_ID = "10143";
const MONAD_RPC_URL = "https://testnet-rpc.monad.xyz";

export default function BreakMonadGame() {
  const [clicks, setClicks] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");

  useEffect(() => {
    if (!isPlaying) {
      setLeaderboard((prev) => [...prev, { walletAddress, transactions, profileImage }].sort((a, b) => b.transactions - a.transactions));
    }
  }, [isPlaying]);

  const handleClick = () => {
    setClicks((prev) => prev + 1);
    setTransactions((prev) => prev + 1);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== parseInt(MONAD_CHAIN_ID)) {
          alert("Please switch to Monad Testnet");
          return;
        }
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("Please install MetaMask to connect");
    }
  };

  const handleLogin = () => {
    if (email.trim() && password.trim() && walletAddress) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter email, password, and connect wallet");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {!isLoggedIn ? (
        <Card className="p-4 text-center">
          <CardContent>
            <h1 className="text-2xl font-bold">🚀 BREAK MONAD! 🚀</h1>
            <Input
              className="mt-2"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="mt-2"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="mt-4" onClick={connectWallet}>Connect Wallet (Monad Testnet)</Button>
            <p className="mt-2">Wallet: {walletAddress ? walletAddress : "Not connected"}</p>
            <Button className="mt-4" onClick={handleLogin}>Login / Sign Up</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="p-4 text-center">
            <CardContent>
              <h1 className="text-2xl font-bold">🚀 BREAK MONAD! 🚀</h1>
              <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full mx-auto mt-2" />
              <p className="mt-2">Wallet: {walletAddress}</p>
              <p>Clicks: {clicks}</p>
              <p>Transactions: {transactions}</p>
              <Button className="mt-4" onClick={handleClick} disabled={!isPlaying}>Click Me! ⚡</Button>
              {!isPlaying ? (
                <Button className="mt-4 bg-green-500" onClick={() => setIsPlaying(true)}>Start Game 🎮</Button>
              ) : (
                <Button className="mt-4 bg-red-500" onClick={() => setIsPlaying(false)}>Stop Game ⛔</Button>
              )}
            </CardContent>
          </Card>
          <Card className="p-4 text-center mt-6">
            <CardContent>
              <h2 className="text-xl font-bold">🏆 Leaderboard 🏆</h2>
              <ul>
                {leaderboard.map((player, index) => (
                  <li key={index} className="mt-2 flex items-center space-x-2">
                    <img src={player.profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
                    <span>{index + 1}. {player.walletAddress} - {player.transactions} transactions</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
