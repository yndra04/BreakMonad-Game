   🚀 ClickBreaker: Break Monad 🚀
=================================================================
A fast-paced, transaction-heavy game where every click matters! ⚡
------------------------------------------------------------------
📌 How to Install and Run the Game
------------------------------------------------------------------

1️⃣ Clone the Repository
Copy the code from GitHub to your local machine:
```
git clone https://github.com/yndra04/BreakMonad-Game.git
```
```
cd BreakMonad-Game
```
2️⃣ Install Dependencies
Ensure Node.js is installed. If not, download it from nodejs.org.

Then, install all required dependencies:
```
npm install
```
3️⃣ Run the Game Locally
Once the installation is complete, start the game with:
```
npm run dev
```
If using Yarn, run:
```
yarn dev
```
4️⃣ Open the Game in Your Browser
Once running, the game will be available at:
```
http://localhost:3000
```


Open this in your browser to start playing! 🎮

🛠 Optional: Deploy the Game Online

🔄 Deploy to Vercel
To make the game available online using Vercel, follow these steps:

Install Vercel CLI
```
npm install -g vercel
```
Login to Vercel
```
vercel login
```
Deploy to Vercel
```
vercel
```
Vercel will provide a URL where the game can be played online.
==============================================================

📜 Solidity Smart Contract (With Rewards, NFT, and Leaderboard)
🗂 Path: contracts/ClickBreaker.sol
This smart contract:
✅ Rewards players with MON tokens
✅ Mints NFTs for milestone achievements
✅ Tracks an on-chain leaderboard
--------------------------------------------------------------
🛠 Deployment & Integration
📝 Hardhat Configuration
🗂 Path: hardhat.config.js
-------------------------------------------------------------
📝 Deployment Script
🗂 Path: scripts/deploy.js
------------------------------------------------------------
🚀 Deploy to Monad Testnet
```
npx hardhat compile
npx hardhat run scripts/deploy.js --network monad
---
----------------------------------------------------------
📝 Frontend Integration (Ethers.js)
🗂 Path: frontend/main.js
----------------------------------------------------------
📝 Frontend UI
🗂 Path: frontend/index.html
----------------------------------------------------------
🚀 Summary
✅ Rewards players with MON tokens per click
✅ Mints NFTs at milestones (every 10 clicks)
✅ Maintains an on-chain leaderboard
✅ Includes full frontend integration with Ethers.js
✅ Tested & Ready for Monad Testnet


