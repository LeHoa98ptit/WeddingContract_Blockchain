# Project Report on Blockchain Wedding Contract

### LE Thi Hoa - 12310380
### TRAN Hai Linh - 12310487


### January 2024



## I. Introduction
  The Blockchain Wedding Contract project aims to create a decentralized database for marriage contracts. It utilizes blockchain technology to ensure data integrity and security, as well as to provide the ability to track information related to marriages and children.

## II. Features
### 1. User Interface
Connect to MetaMask:
- Users can connect their MetaMask wallet by clicking the “Connect” button.
- The connection status will be displayed
Create Wedding Contract:
- Users enter the names of the husband and wife in the “Husband's Name” and “Wife's Name” fields.
- In the case of children, users can enter the child's name in the “Child's Name” field.
- Then, users click the “Create Wedding Contract” button.
- The transaction hash will be displayed, and the contract address will be filled in the “Wedding Contract” field.
View Details on Etherscan:
- Users can click the “View on Etherscan” button to see transaction details on Etherscan.
Check Contract:
- Users click the "Check Certificate" button to check certificate
- Information about the husband, wife, and children (if any) will be displayed.

### 2. Code Flow
Connect to MetaMask:
- If MetaMask is installed, the connection is established through Web3.
- Users can select an account to connect.

Create Wedding Contract:
- Call the “createCertificate” function in the “WeddingCertificateFactory” smart contract.
- Pass information about the husband, wife, and children to the function.
- Send the transaction and receive the transaction hash and the address of the new contract.
Check Contract:
- Call the “getPartnersNames” function in the “WeddingCertificateFactory” smart contract.
- Pass the contract address and receive information about the husband, wife, and children
- Display the information on the user interface.
View Details on Etherscan:
- Use the transaction hash to create a URL on Etherscan
- Open the link in a new window.

### 3. Conclusion
  The Blockchain Wedding Contract project provides benefits in terms of data integrity and the ability to track essential information about weddings and families. The user-friendly interface and the integration of the Etherscan viewing feature make it easy for users to monitor and manage their information on the blockchain.


