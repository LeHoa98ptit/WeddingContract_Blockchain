// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WeddingCertificate {
    string public partner1;
    string public partner2;
    string public chil1;

    constructor(string memory _partner1, string memory _partner2, string memory _chil1) {
        partner1 = _partner1;
        partner2 = _partner2;
        chil1 = _chil1;
    }
}