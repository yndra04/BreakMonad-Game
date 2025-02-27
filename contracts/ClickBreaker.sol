// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClickBreaker is ERC721URIStorage, Ownable {
    // MON Token interface
    IERC20 public monToken;

    // Mapping to track clicks per player
    mapping(address => uint256) public clicks;

    // Mapping for on-chain leaderboard
    address[] public leaderboard;

    // NFT Token ID counter
    uint256 public nextTokenId;

    // Event when a player clicks
    event Clicked(address indexed player, uint256 totalClicks);
    event Rewarded(address indexed player, uint256 amount);
    event NFTMinted(address indexed player, uint256 tokenId);

    // Constructor to set MON token address
    constructor(address _monToken) ERC721("ClickBreakerNFT", "CBNFT") {
        monToken = IERC20(_monToken);
    }

    // Function to record a click
    function click() public {
        clicks[msg.sender] += 1;
        emit Clicked(msg.sender, clicks[msg.sender]);

        // Reward player with MON tokens (1 MON per click)
        require(monToken.transfer(msg.sender, 1 * 10**18), "MON transfer failed");
        emit Rewarded(msg.sender, 1 * 10**18);

        // Check milestone for NFT minting
        if (clicks[msg.sender] % 10 == 0) {
            mintNFT(msg.sender);
        }

        // Update leaderboard
        updateLeaderboard(msg.sender);
    }

    // Function to mint an NFT
    function mintNFT(address player) internal {
        uint256 tokenId = nextTokenId;
        _safeMint(player, tokenId);
        _setTokenURI(tokenId, "ipfs://your-nft-metadata-uri"); // Replace with actual NFT metadata
        nextTokenId++;

        emit NFTMinted(player, tokenId);
    }

    // Function to update the leaderboard
    function updateLeaderboard(address player) internal {
        bool exists = false;
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == player) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            leaderboard.push(player);
        }
    }

    // Function to view the leaderboard
    function getLeaderboard() public view returns (address[] memory) {
        return leaderboard;
    }
}
