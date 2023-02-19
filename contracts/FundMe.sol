// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundMe {
    address public immutable owner;
    mapping(address => uint) public addresstoamount;
    uint public constant minimum = 2 ether;
    address[] public funders;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value >= minimum, "Not enough Ether");
        addresstoamount[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addresstoamount[funder] = 0;
        }
        funders = new address[](0);
        payable(msg.sender).transfer(address(this).balance);
    }

    modifier onlyvalue() {
        require(msg.value >= minimum, "Not enough Ether");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "CAn only access by owner");
        _;
    }
}
