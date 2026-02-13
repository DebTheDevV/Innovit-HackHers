// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BatchAnchor {

    struct BatchProof {
        bytes32 hash;
        uint256 timestamp;
        address anchoredBy;
    }

    mapping(string => BatchProof) private proofs;

    event BatchAnchored(
        string batchId,
        bytes32 hash,
        uint256 timestamp,
        address indexed anchoredBy
    );

    function anchorBatch(string memory batchId, bytes32 hash) public {
        require(proofs[batchId].timestamp == 0, "Batch already anchored");

        proofs[batchId] = BatchProof({
            hash: hash,
            timestamp: block.timestamp,
            anchoredBy: msg.sender
        });

        emit BatchAnchored(batchId, hash, block.timestamp, msg.sender);
    }

    function verifyBatch(string memory batchId, bytes32 hash)
        public
        view
        returns (bool valid, uint256 timestamp, address anchoredBy)
    {
        BatchProof memory proof = proofs[batchId];

        if (proof.timestamp == 0) {
            return (false, 0, address(0));
        }

        return (
            proof.hash == hash,
            proof.timestamp,
            proof.anchoredBy
        );
    }
}