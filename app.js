
document.addEventListener('DOMContentLoaded', async() => {
    // Votre clé API Alchemy
    let web3;

    // Check for MetaMask, else use Alchemy's HTTP provider
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Acccounts now exposed, use web3 to get the user's accounts.
        } catch (error) {
            // User denied account access...
            console.error("User denied account access");
        }
    } else {
        // If MetaMask is not installed, you can still use Alchemy's HTTP provider for read operations
		// https://goerli.infura.io/v3/24ed1a0a493f421c9e9a816b2d2973c8
		// https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}
        web3 = new Web3(new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/6f357b7a965b458a9d448df02b314128`));
    }
    // The ABI for the WeddingCertificateFactory contract
    const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "certificateAddress",
                    "type": "address"
                }
            ],
            "name": "CertificateCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "certificates",
            "outputs": [
                {
                    "internalType": "contract WeddingCertificate",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_partner1",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_partner2",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_chil1",
                    "type": "string"
                }
            ],
            "name": "createCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCertificatesCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "certificateAddress",
                    "type": "address"
                }
            ],
            "name": "getPartnersNames",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Fonction pour se connecter à Metamask et afficher l'adresse
    async function connectToMetaMask() {
        const statusElement = document.getElementById('status'); // Get the status element

        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    console.log('Connected account:', accounts[0]);
                    statusElement.textContent = `Status: Connected - ${accounts[0]}`;
                    // Other logic for successful connection...
                } else {
                    console.error('No accounts available. User might have denied account access.');
                    statusElement.textContent = 'Status: Access denied or not connected';
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                statusElement.textContent = 'Status: Connection error';
            }
        } else {
            console.error('MetaMask is not installed.');
            statusElement.textContent = 'Status: MetaMask not installed';
        }
    }
    const contractAddress = '0x2ab384d746f3a71260b2425f7a89239b80942dd8';
    // const contractAddress = '0x026bab2e6392656fce7c760bc0bc32af54565345';
    const weddingCertificateFactory = new web3.eth.Contract(contractABI, contractAddress);
    async function createNewCertificate(partner1, partner2, chil1) {
        if (!window.ethereum) {
            console.error("MetaMask is not installed.");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                throw new Error("No accounts available. User might have denied account access.");
            }

            const receipt = await weddingCertificateFactory.methods.createCertificate(partner1, partner2, chil1)
                .send({ from: accounts[0] });

            console.log('Certificate created! Transaction hash:', receipt.transactionHash);
            document.getElementById('transactionHash').value = receipt.transactionHash;
            document.getElementById('certificateAddressInput').value = receipt.events.CertificateCreated.returnValues.certificateAddress;
            // The receipt will also contain the address of the new contract if the event was emitted
            if (receipt.events.CertificateCreated) {
                return receipt.events.CertificateCreated.returnValues.certificateAddress;
            } else {
                throw new Error("CertificateCreated event not emitted");
            }
        } catch (error) {
            console.error("Error in createNewCertificate:", error);
            throw error;
        }
    }

    // Ajoute un événement de clic au bouton de connexion
    document.getElementById('connectButton').addEventListener('click', connectToMetaMask);
    // Function to get the partner names from a certificate contract address
    async function getNamesFromCertificateAddress(certificateAddress) {
        debugger;
        const names = await weddingCertificateFactory.methods.getPartnersNames(certificateAddress).call();
        console.log('Partners names:', names[0], names[1]);
        document.getElementById('spouse1').value = names[0];
        document.getElementById('spouse2').value = names[1];
        document.getElementById('spouse3').value = names[2];
        return names;
    }

    // Example: Call this function when a user submits the form to create a certificate
    document.getElementById('createCertificateButton').onclick = async function() {
        const partner1Name = document.getElementById('partner1').value;
        const partner2Name = document.getElementById('partner2').value;
        const chil1Name = document.getElementById('chil1').value;

        const certificateAddress = await createNewCertificate(partner1Name, partner2Name, chil1Name);
        console.log('New certificate address:', certificateAddress);
        // Update the UI with the new certificate address
    };

    // Example: Call this function when a user wants to check the names on a certificate
    document.getElementById('checkCertificateButton').onclick = async function() {
        const certificateAddressInput = document.getElementById('certificateAddressInput').value;
        const names = await getNamesFromCertificateAddress(certificateAddressInput);
        console.log('Names on the certificate:', names);
        // Update the UI with the partner names
    };

    document.getElementById('viewOnEtherscan').onclick = async function() {
        const transactionHash = document.getElementById('transactionHash').value;
        const etherscanURL = `https://goerli.etherscan.io/tx/${transactionHash}`;
        window.open(etherscanURL, '_blank');
    }
});