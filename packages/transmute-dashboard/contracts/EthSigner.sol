pragma solidity ^0.4.17;

contract EthSigner {

    struct User {
        bytes32 firstName;
        bytes32 lastName;
        bytes32 email;
        bytes32 signatureHash;
        bytes32[] documents;
    }

    struct Document {
        uint created;
        address sender;
        address recipient;
        uint senderSigned;
        uint recipientSigned;
    }

    address public owner;
    mapping (address => User) userIndex;
    mapping (bytes32 => Document) documentIndex;

    event UserAdded(
      address indexed _address,
      bytes32 indexed _email
    );

    event SignatureAdded(
      address indexed _address,
      bytes32 indexed _signatureHash
    );

    event DocumentCreated(
      bytes32 indexed _documentHash,
      address indexed _sender,
      address indexed _recipient
    );

    event DocumentSigned(
      bytes32 indexed _documentHash,
      address indexed _signer
    );

    function EthSigner() public {
        owner = msg.sender;
    }

    function addUser(address _address, bytes32 _firstName, bytes32 _lastName, bytes32 _email) public {
        if (msg.sender != owner) {
            // "401 Unauthorized"
            revert();
        }
        if (userIndex[_address].email.length != 0) {
            // "409 Conflict"
            revert();
        }

        User storage user = userIndex[_address];
        user.firstName = _firstName;
        user.lastName = _lastName;
        user.email = _email;

        emit UserAdded(_address, _email);
    }

    function getUser(address _address) public view returns (bytes32, bytes32, bytes32, bytes32, bytes32[]) {
        if (userIndex[_address].email.length == 0) {
            // "404 Not Found"
            revert();
        }
        return (
            userIndex[_address].firstName,
            userIndex[_address].lastName,
            userIndex[_address].email,
            userIndex[_address].signatureHash,
            userIndex[_address].documents
        );
    }

    function addSignature(bytes32 _signatureHash) public {
        if (userIndex[msg.sender].email.length == 0) {
            // "404 Not Found"
            revert();
        }
        if (userIndex[msg.sender].signatureHash.length != 0) {
            // "409 Conflict"
            revert();
        }
        
        User storage user = userIndex[msg.sender];
        user.signatureHash = _signatureHash;
        
        emit SignatureAdded(msg.sender, _signatureHash);
    }

    function createDocument(bytes32 _documentHash, address _recipient) public {
        if (userIndex[msg.sender].email.length == 0) {
            // "404 Not Found"
            revert();
        }
        if (userIndex[_recipient].email.length == 0) {
            // "404 Not Found"
            revert();
        }
        
        documentIndex[_documentHash] = Document(now, msg.sender, _recipient, 0, 0);
        
        User storage sender = userIndex[msg.sender];
        sender.documents.push(_documentHash);

        User storage recipient = userIndex[_recipient];
        recipient.documents.push(_documentHash);

        emit DocumentCreated(_documentHash, msg.sender, _recipient);
    }

    function signDocument(bytes32 _documentHash) public {
        if (documentIndex[_documentHash].created == 0) {
            // "404 Not Found"
            revert();
        }
        
        Document storage document = documentIndex[_documentHash];

        if (documentIndex[_documentHash].sender == msg.sender && documentIndex[_documentHash].senderSigned == 0) {
            document.senderSigned = now;
            emit DocumentSigned(_documentHash, msg.sender);
        } else if (documentIndex[_documentHash].recipient == msg.sender && documentIndex[_documentHash].recipientSigned == 0) {
            document.senderSigned = now;
            emit DocumentSigned(_documentHash, msg.sender);
        } else {
            // "401 Unauthorized"
            revert();
        }
    }
}
