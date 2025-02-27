const contractAddress = "0xYourDeployedContractAddress"; // Replace with deployed contract address
const abi = [ /* ABI from compiled contract */ ];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

async function handleClick() {
    try {
        const tx = await contract.click();
        await tx.wait();
        console.log("Transaction successful!");

        // Update leaderboard UI
        updateLeaderboard();
    } catch (error) {
        console.error("Transaction failed", error);
    }
}

async function updateLeaderboard() {
    const leaderboard = await contract.getLeaderboard();
    document.getElementById("leaderboard").innerHTML = leaderboard.map(
        (player, index) => `<li>${index + 1}. ${player}</li>`
    ).join('');
}

document.getElementById("clickButton").addEventListener("click", handleClick);
