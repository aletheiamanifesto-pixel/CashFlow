// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IAssetNFT.sol";

/// @title AssetNFT - Tokenizzazione Asset Fisici per CashFlow
/// @notice ERC-721 che rappresenta beni fisici di valore depositati nella piattaforma CashFlow.
///         Ogni token è una ricevuta digitale certificata del bene depositato.
/// @dev Implementa un ruolo APPRAISER per i periti autorizzati a mintare nuovi token.
///      Il contratto è deployato su Polygon per commissioni minime.
contract AssetNFT is ERC721, ERC721Burnable, Ownable, IAssetNFT {
    // ============================================================
    //                         STATE
    // ============================================================

    /// @notice Contatore per generare token ID progressivi
    uint256 private _nextTokenId;

    /// @notice Mapping tokenId => metadati asset fisico
    mapping(uint256 => AssetMetadata) private _assets;

    /// @notice Indirizzi autorizzati a mintare NFT (periti certificati)
    mapping(address => bool) public appraisers;

    // ============================================================
    //                        EVENTS
    // ============================================================

    event AppraiserAdded(address indexed appraiser);
    event AppraiserRemoved(address indexed appraiser);

    // ============================================================
    //                        MODIFIERS
    // ============================================================

    /// @notice Solo perito autorizzato o owner può mintare
    modifier onlyAppraiser() {
        require(
            appraisers[msg.sender] || msg.sender == owner(),
            "AssetNFT: non autorizzato"
        );
        _;
    }

    // ============================================================
    //                       CONSTRUCTOR
    // ============================================================

    /// @param initialOwner Indirizzo dell'owner iniziale (treasury CashFlow)
    constructor(address initialOwner)
        ERC721("CashFlow Asset NFT", "CFASSET")
        Ownable(initialOwner)
    {
        // Il deployer è automaticamente abilitato come appraiser
        appraisers[initialOwner] = true;
        emit AppraiserAdded(initialOwner);
    }

    // ============================================================
    //                    APPRAISER MANAGEMENT
    // ============================================================

    /// @notice Aggiunge un nuovo perito autorizzato
    /// @param appraiser Indirizzo del perito da aggiungere
    function addAppraiser(address appraiser) external onlyOwner {
        require(appraiser != address(0), "AssetNFT: indirizzo non valido");
        appraisers[appraiser] = true;
        emit AppraiserAdded(appraiser);
    }

    /// @notice Rimuove un perito dalla lista autorizzati
    /// @param appraiser Indirizzo del perito da rimuovere
    function removeAppraiser(address appraiser) external onlyOwner {
        appraisers[appraiser] = false;
        emit AppraiserRemoved(appraiser);
    }

    // ============================================================
    //                      CORE FUNCTIONS
    // ============================================================

    /// @inheritdoc IAssetNFT
    /// @dev Validazione completa prima del mint per garantire integrità dei dati on-chain
    function mintAsset(
        address to,
        AssetMetadata memory data
    ) external onlyAppraiser returns (uint256) {
        require(to != address(0), "AssetNFT: destinatario non valido");
        require(bytes(data.assetType).length > 0, "AssetNFT: tipo asset mancante");
        require(data.weightGrams > 0, "AssetNFT: peso deve essere > 0");
        require(data.valuationEUR > 0, "AssetNFT: valutazione deve essere > 0");
        require(data.depositTimestamp > 0, "AssetNFT: timestamp mancante");

        uint256 tokenId = _nextTokenId++;
        _assets[tokenId] = data;
        _safeMint(to, tokenId);

        emit AssetDeposited(tokenId, to, data.assetType, data.valuationEUR);

        return tokenId;
    }

    /// @inheritdoc IAssetNFT
    /// @dev Solo il proprietario del token può riscattare — brucia il token e cancella i metadati
    function redeemAsset(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "AssetNFT: non sei il proprietario");
        address tokenOwner = msg.sender;
        delete _assets[tokenId];
        burn(tokenId);
        emit AssetRedeemed(tokenId, tokenOwner);
    }

    /// @inheritdoc IAssetNFT
    function getAssetMetadata(uint256 tokenId)
        external
        view
        returns (AssetMetadata memory)
    {
        require(_ownerOf(tokenId) != address(0), "AssetNFT: token non esistente");
        return _assets[tokenId];
    }

    // ============================================================
    //                    OVERRIDES REQUIRED
    // ============================================================

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
