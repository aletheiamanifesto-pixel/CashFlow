// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IAssetNFT - Interfaccia per la tokenizzazione di asset fisici
/// @notice Definisce le funzioni per mintare e gestire NFT che rappresentano beni fisici depositati
interface IAssetNFT {
    /// @notice Struttura che contiene i metadati dell'asset fisico
    struct AssetMetadata {
        string assetType;         // Tipo: gold, silver, watch, jewelry, etc.
        uint256 weightGrams;      // Peso in grammi × 100 (2 decimali)
        uint256 valuationEUR;     // Valutazione in EUR × 100 (centesimi)
        uint256 depositTimestamp; // Timestamp Unix del deposito
        string serialNumber;      // Numero seriale univoco (generato dal backend)
        string description;       // Descrizione dettagliata dell'asset
    }

    /// @notice Evento emesso quando un nuovo asset viene depositato e tokenizzato
    event AssetDeposited(
        uint256 indexed tokenId,
        address indexed owner,
        string assetType,
        uint256 valuationEUR
    );

    /// @notice Evento emesso quando l'utente riscatta il proprio asset fisico
    event AssetRedeemed(uint256 indexed tokenId, address indexed owner);

    /// @notice Minta un nuovo NFT per un asset fisico depositato
    /// @param to Indirizzo del proprietario dell'asset
    /// @param data Metadati dell'asset
    /// @return tokenId ID del token mintato
    function mintAsset(address to, AssetMetadata memory data) external returns (uint256 tokenId);

    /// @notice Riscatta un asset fisico bruciando il relativo NFT
    /// @param tokenId ID del token da bruciare
    function redeemAsset(uint256 tokenId) external;

    /// @notice Recupera i metadati on-chain di un asset
    /// @param tokenId ID del token
    /// @return Struttura AssetMetadata con tutti i dettagli
    function getAssetMetadata(uint256 tokenId) external view returns (AssetMetadata memory);
}
