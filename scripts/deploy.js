const hre = require("hardhat");

async function main() {
    const monTokenAddress = "0xYourMONTokenAddress"; // Replace with actual MON token contract address

    const ClickBreaker = await hre.ethers.getContractFactory("ClickBreaker");
    const clickBreaker = await ClickBreaker.deploy(monTokenAddress);

    await clickBreaker.deployed();
    console.log(`ClickBreaker deployed to: ${clickBreaker.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
