// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WeddingCertificate.sol";

contract WeddingCertificateFactory {
    WeddingCertificate[] public certificates;

    event CertificateCreated(address certificateAddress);

    function createCertificate(string calldata _partner1, string calldata _partner2, string calldata _chil1) external {
        WeddingCertificate newCertificate = new WeddingCertificate(_partner1, _partner2, _chil1);
        certificates.push(newCertificate);
        emit CertificateCreated(address(newCertificate));
    }

    function getCertificatesCount() external view returns (uint) {
        return certificates.length;
    }

    function getPartnersNames(address certificateAddress) external view returns (string memory, string memory, string memory) {
        WeddingCertificate certificate = WeddingCertificate(certificateAddress);
        return (certificate.partner1(), certificate.partner2(), certificate.chil1());
    }
}