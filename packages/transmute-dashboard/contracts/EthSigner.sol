pragma solidity ^0.4.17;

contract EthSigner {

    struct Document {
        address[] signatories;
        bytes32[] signatures;
    }

    struct User {
        bytes32 signature;
        bytes32[] documents;
    }

    mapping (address => User) userIndex;
    mapping (bytes32 => Document) documentIndex;

    event SignatureAdded(
      address indexed _address,
      bytes32 indexed _signature
    );

    event DocumentCreated(
      bytes32 indexed _document,
      address[] indexed signatories
    );

    event DocumentSigned(
      bytes32 indexed _document,
      address indexed _signator
    );

    function EthSigner() public {}

    function addSignature(bytes32 _signature) public {
        if (userIndex[msg.sender].signature.length != 0) {
            // "409 Conflict"
            revert();
        }
        
        User storage user = userIndex[msg.sender];
        user.signature = _signature;
        
        emit SignatureAdded(msg.sender, _signature);
    }

    function getSignature(address _address) public view returns (bytes32) {
        if (userIndex[_address].signature.length == 0) {
            revert();
        }
        return userIndex[_address].signature;
    }

    function getDocuments(address _address) public view returns (bytes32[]) {
        if (userIndex[_address].signature.length == 0) {
            // "404 Not Found"
            revert();
        }
        return userIndex[_address].documents;
    }

    function createDocument(bytes32 _documentHash, address[] _signatories) public {
        documentIndex[_documentHash] = Document(_signatories, new bytes32[](0));

        // Waste of gas, should be storing these things offchain
        for (uint i = 0; i < _signatories.length; i++) {
            if (userIndex[msg.sender].signature.length == 0) {
                // "404 Not Found"
                revert();
            }
            User storage user = userIndex[_signatories[i]];
            user.documents.push(_documentHash);
        }

        emit DocumentCreated(_documentHash, _signatories);
    }

    function signDocument(bytes32 _documentHash) public {
        if (documentIndex[_documentHash].signatories.length == 0) {
            // "404 Not Found"
            revert();
        }
        if (userIndex[msg.sender].signature.length == 0) {
            // "404 Not Found"
            revert();
        }
        if (documentIndex[_documentHash].signatures.length == documentIndex[_documentHash].signatories.length) {
            // Everyone has signed
            revert();
        }
        
        Document storage document = documentIndex[_documentHash];

        for (uint i = 0; i < document.signatories.length; i++) {
            if (document.signatories[i] == msg.sender) {
              document.signatures.push(userIndex[msg.sender].signature);
              emit DocumentSigned(_documentHash, msg.sender);
              return;
            }
        }

        // "401 Unauthorized"
        revert();
    }
}
