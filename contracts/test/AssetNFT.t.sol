// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AssetNFT.sol";
import "../src/interfaces/IAssetNFT.sol";

contract AssetNFTTest is Test {
    AssetNFT public nft;

    address public owner = address(1);
    address public appraiser = address(2);
    address public user = address(3);
    address public other = address(4);

    IAssetNFT.AssetMetadata public sampleMetadata = IAssetNFT.AssetMetadata({
        assetType: "gold",
        weightGrams: 1550,      // 15.50 grammi
        valuationEUR: 115000,   // 1.150,00 EUR
        depositTimestamp: 1700000000,
        serialNumber: "CF-2024-001",
        description: "Bracciale oro 18kt"
    });

    function setUp() public {
        vm.prank(owner);
        nft = new AssetNFT(owner);
    }

    // ============================================================
    //                      DEPLOYMENT
    // ============================================================

    function test_Deployment() public view {
        assertEq(nft.name(), "CashFlow Asset NFT");
        assertEq(nft.symbol(), "CFASSET");
        assertEq(nft.owner(), owner);
        assertTrue(nft.appraisers(owner));
    }

    // ============================================================
    //                  APPRAISER MANAGEMENT
    // ============================================================

    function test_AddAppraiser() public {
        vm.prank(owner);
        nft.addAppraiser(appraiser);
        assertTrue(nft.appraisers(appraiser));
    }

    function test_AddAppraiser_EmitsEvent() public {
        vm.prank(owner);
        vm.expectEmit(true, false, false, false);
        emit AssetNFT.AppraiserAdded(appraiser);
        nft.addAppraiser(appraiser);
    }

    function test_RemoveAppraiser() public {
        vm.prank(owner);
        nft.addAppraiser(appraiser);

        vm.prank(owner);
        nft.removeAppraiser(appraiser);
        assertFalse(nft.appraisers(appraiser));
    }

    function test_OnlyOwnerCanAddAppraiser() public {
        vm.prank(other);
        vm.expectRevert();
        nft.addAppraiser(appraiser);
    }

    function test_CannotAddZeroAddressAppraiser() public {
        vm.prank(owner);
        vm.expectRevert("AssetNFT: indirizzo non valido");
        nft.addAppraiser(address(0));
    }

    // ============================================================
    //                       MINT
    // ============================================================

    function test_MintAsset() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);

        assertEq(tokenId, 0);
        assertEq(nft.ownerOf(tokenId), user);
    }

    function test_MintAssetByAppraiser() public {
        vm.prank(owner);
        nft.addAppraiser(appraiser);

        vm.prank(appraiser);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);
        assertEq(nft.ownerOf(tokenId), user);
    }

    function test_MintIncreasesBalance() public {
        vm.prank(owner);
        nft.mintAsset(user, sampleMetadata);

        assertEq(nft.balanceOf(user), 1);
    }

    function test_UnauthorizedCannotMint() public {
        vm.prank(other);
        vm.expectRevert("AssetNFT: non autorizzato");
        nft.mintAsset(user, sampleMetadata);
    }

    function test_CannotMintToZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert();
        nft.mintAsset(address(0), sampleMetadata);
    }

    function test_CannotMintWithZeroWeight() public {
        IAssetNFT.AssetMetadata memory badMeta = sampleMetadata;
        badMeta.weightGrams = 0;

        vm.prank(owner);
        vm.expectRevert("AssetNFT: peso deve essere > 0");
        nft.mintAsset(user, badMeta);
    }

    function test_CannotMintWithZeroValuation() public {
        IAssetNFT.AssetMetadata memory badMeta = sampleMetadata;
        badMeta.valuationEUR = 0;

        vm.prank(owner);
        vm.expectRevert("AssetNFT: valutazione deve essere > 0");
        nft.mintAsset(user, badMeta);
    }

    function test_CannotMintWithEmptyAssetType() public {
        IAssetNFT.AssetMetadata memory badMeta = sampleMetadata;
        badMeta.assetType = "";

        vm.prank(owner);
        vm.expectRevert("AssetNFT: tipo asset mancante");
        nft.mintAsset(user, badMeta);
    }

    function test_CannotMintWithZeroTimestamp() public {
        IAssetNFT.AssetMetadata memory badMeta = sampleMetadata;
        badMeta.depositTimestamp = 0;

        vm.prank(owner);
        vm.expectRevert("AssetNFT: timestamp mancante");
        nft.mintAsset(user, badMeta);
    }

    function test_MintEmitsEvent() public {
        vm.prank(owner);
        vm.expectEmit(true, true, false, true);
        emit IAssetNFT.AssetDeposited(0, user, "gold", 115000);
        nft.mintAsset(user, sampleMetadata);
    }

    function test_MintMultipleAssets() public {
        vm.prank(owner);
        uint256 id1 = nft.mintAsset(user, sampleMetadata);
        vm.prank(owner);
        uint256 id2 = nft.mintAsset(user, sampleMetadata);

        assertEq(id1, 0);
        assertEq(id2, 1);
        assertEq(nft.balanceOf(user), 2);
    }

    // ============================================================
    //                     METADATA
    // ============================================================

    function test_GetAssetMetadata() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);

        IAssetNFT.AssetMetadata memory meta = nft.getAssetMetadata(tokenId);
        assertEq(meta.assetType, "gold");
        assertEq(meta.weightGrams, 1550);
        assertEq(meta.valuationEUR, 115000);
        assertEq(meta.depositTimestamp, 1700000000);
        assertEq(meta.serialNumber, "CF-2024-001");
        assertEq(meta.description, "Bracciale oro 18kt");
    }

    function test_GetMetadataForNonexistentToken() public {
        vm.expectRevert("AssetNFT: token non esistente");
        nft.getAssetMetadata(999);
    }

    // ============================================================
    //                      REDEEM
    // ============================================================

    function test_RedeemAsset() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);

        vm.prank(user);
        nft.redeemAsset(tokenId);

        vm.expectRevert();
        nft.ownerOf(tokenId);
    }

    function test_RedeemEmitsEvent() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);

        vm.prank(user);
        vm.expectEmit(true, true, false, false);
        emit IAssetNFT.AssetRedeemed(tokenId, user);
        nft.redeemAsset(tokenId);
    }

    function test_OnlyOwnerCanRedeem() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);

        vm.prank(other);
        vm.expectRevert("AssetNFT: non sei il proprietario");
        nft.redeemAsset(tokenId);
    }

    function test_MetadataDeletedOnRedeem() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);

        vm.prank(user);
        nft.redeemAsset(tokenId);

        vm.expectRevert("AssetNFT: token non esistente");
        nft.getAssetMetadata(tokenId);
    }

    function test_BalanceDecreasesOnRedeem() public {
        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, sampleMetadata);
        assertEq(nft.balanceOf(user), 1);

        vm.prank(user);
        nft.redeemAsset(tokenId);
        assertEq(nft.balanceOf(user), 0);
    }

    // ============================================================
    //                  ERC-721 STANDARD
    // ============================================================

    function test_SupportsERC721Interface() public view {
        assertTrue(nft.supportsInterface(0x80ac58cd)); // ERC-721
    }

    function test_SupportsERC165Interface() public view {
        assertTrue(nft.supportsInterface(0x01ffc9a7)); // ERC-165
    }

    // ============================================================
    //                   FUZZ TESTING
    // ============================================================

    function testFuzz_MintAssetWithValidValues(
        uint128 weightGrams,
        uint128 valuationEUR,
        uint64 depositTimestamp
    ) public {
        vm.assume(weightGrams > 0);
        vm.assume(valuationEUR > 0);
        vm.assume(depositTimestamp > 0);

        IAssetNFT.AssetMetadata memory meta = IAssetNFT.AssetMetadata({
            assetType: "gold",
            weightGrams: weightGrams,
            valuationEUR: valuationEUR,
            depositTimestamp: depositTimestamp,
            serialNumber: "FUZZ-001",
            description: "Fuzz test asset"
        });

        vm.prank(owner);
        uint256 tokenId = nft.mintAsset(user, meta);
        assertEq(nft.ownerOf(tokenId), user);
    }
}
