// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BatchRegistry {

    address public owner;

    struct Batch {
        string batchId;
        string hash;
        uint256 timestamp;
    }

    mapping(string => Batch) private batches;

    event BatchStored(string batchId, string hash, uint256 time);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeBatchHash(string memory _batchId, string memory _hash) public onlyOwner {
        batches[_batchId] = Batch(_batchId, _hash, block.timestamp);
        emit BatchStored(_batchId, _hash, block.timestamp);
    }

    function getBatchHash(string memory _batchId) public view returns (string memory, uint256) {
        return (batches[_batchId].hash, batches[_batchId].timestamp);
    }
}