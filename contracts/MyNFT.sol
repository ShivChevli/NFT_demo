// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract MyNFT is ERC721 {

//     using Counters for Counters.Counter;
//     Counters.Counter private currentTokenId;

//     constructor() ERC721("NFTTutorial", "NFT") {}

//     function mintTo(address recipient)
//         public
//         returns (uint256)
//     {
//         currentTokenId.increment();
//         uint256 newItemId = currentTokenId.current();
//         _safeMint(recipient, newItemId);
//         return newItemId;
//     }

// }

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, PullPayment, Ownable {
    using Counters for Counters.Counter;

    // Constants
    uint256 public constant TOTAL_SUPPLY = 10_000;

    Counters.Counter private currentTokenId;

    /**
     * @dev A mapping from NFT ID to the address that owns it.
     */
    mapping(uint256 => address) internal idToOwner;

    /**
     * @dev Mapping from NFT ID to approved address.
     */
    mapping(uint256 => address) internal idToApproval;

    /**
     * @dev Mapping from owner address to count of their tokens.
     */
    mapping(address => uint256) private ownerToNFTokenCount;

    /**
     * @dev Mapping from owner address to count of their tokens.
     */
    mapping(uint256 => string) private tokenURIAddress;

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    constructor() ERC721("NFTTutorial", "NFT") {
        baseTokenURI = "";
    }

    function mintTo(address recipient, string calldata _uri)
        public
        payable
        returns (uint256)
    {
        uint256 tokenId = currentTokenId.current();
        require(tokenId < TOTAL_SUPPLY, "Max supply reached");

        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        tokenURIAddress[newItemId] = _uri;
        _safeMint(recipient, newItemId);

        return newItemId;
    }

    function getTokenURIAddress(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return tokenURIAddress[tokenId];
    }

    /// @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Sets the base token URI prefix.
    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// @dev Overridden in order to make it an onlyOwner function
    function withdrawPayments(address payable payee)
        public
        virtual
        override
        onlyOwner
    {
        super.withdrawPayments(payee);
    }
}
