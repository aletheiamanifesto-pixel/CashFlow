// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AssetNFT.sol";

/// @notice Script di deploy per AssetNFT su Polygon
/// @dev Eseguire con: forge script script/Deploy.s.sol --rpc-url polygon --broadcast --verify
contract DeployScript is Script {
    function run() external {
        // Legge la private key dall'environment (sicura per produzione)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("=================================");
        console.log("Deploy AssetNFT - CashFlow");
        console.log("=================================");
        console.log("Deployer:", deployer);
        console.log("Network: Polygon");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy del contratto — il deployer diventa owner e primo appraiser
        AssetNFT assetNFT = new AssetNFT(deployer);

        vm.stopBroadcast();

        console.log("AssetNFT deployed at:", address(assetNFT));
        console.log("Owner:", assetNFT.owner());
        console.log("Deployer is appraiser:", assetNFT.appraisers(deployer));
        console.log("");
        console.log("Aggiungi al backend .env:");
        console.log("ASSET_NFT_ADDRESS=", address(assetNFT));
    }
}
