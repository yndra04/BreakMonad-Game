const hre = require("hardhat");

async function main() {
    const ClickBreaker = await hre.ethers.getContractFactory("ClickBreaker");
    const clickBreaker = await ClickBreaker.deploy();

    await clickBreaker.deployed();
    console.log("ClickBreaker deployed to:", clickBreaker.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
