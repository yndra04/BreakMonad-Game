// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ClickBreaker {
    address public owner;
    mapping(address => uint256) public clicks;

    event Clicked(address indexed player, uint256 totalClicks);

    constructor() {
        owner = msg.sender;
    }

    function click() public {
        clicks[msg.sender] += 1;
        emit Clicked(msg.sender, clicks[msg.sender]);
    }

    function getClicks(address player) public view returns (uint256) {
        return clicks[player];
    }
}
