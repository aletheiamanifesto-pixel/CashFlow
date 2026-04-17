import { ethers } from 'ethers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ABI del contratto AssetNFT
const ASSET_NFT_ABI = [
  'function mintAsset(address to, tuple(string assetType, uint256 weightGrams, uint256 valuationEUR, uint256 depositTimestamp, string serialNumber, string description) data) returns (uint256)',
  'function redeemAsset(uint256 tokenId)',
  'function getAssetMetadata(uint256 tokenId) view returns (tuple(string assetType, uint256 weightGrams, uint256 valuationEUR, uint256 depositTimestamp, string serialNumber, string description))',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'event AssetDeposited(uint256 indexed tokenId, address indexed owner, string assetType, uint256 valuationEUR)',
  'event AssetRedeemed(uint256 indexed tokenId, address indexed owner)',
]

export const blockchainService = {
  getProvider() {
    const rpcUrl = process.env.POLYGON_RPC_URL
    if (!rpcUrl) throw new Error('POLYGON_RPC_URL non configurato')
    return new ethers.JsonRpcProvider(rpcUrl)
  },

  getSigner() {
    const privateKey = process.env.TREASURY_PRIVATE_KEY
    if (!privateKey || privateKey.includes('0000000000000000000000000000000000000000000000000000000000000000')) {
      throw new Error('TREASURY_PRIVATE_KEY non configurato')
    }
    return new ethers.Wallet(privateKey, this.getProvider())
  },

  getContract() {
    const address = process.env.ASSET_NFT_ADDRESS
    if (!address || address === '0x0000000000000000000000000000000000000000') {
      throw new Error('ASSET_NFT_ADDRESS non configurato')
    }
    return new ethers.Contract(address, ASSET_NFT_ABI, this.getSigner())
  },

  async mintAsset(params: {
    depositId: string
    recipientAddress: string
    assetType: string
    weightGrams: number
    valuationEUR: number
    serialNumber: string
    description: string
  }) {
    const contract = this.getContract()

    const metadata = {
      assetType: params.assetType,
      weightGrams: BigInt(Math.round(params.weightGrams * 100)), // grammi × 100 (2 decimali)
      valuationEUR: BigInt(Math.round(params.valuationEUR * 100)), // EUR × 100 (centesimi)
      depositTimestamp: BigInt(Math.floor(Date.now() / 1000)),
      serialNumber: params.serialNumber,
      description: params.description,
    }

    const tx = await contract.mintAsset(params.recipientAddress, metadata)
    const receipt = await tx.wait()

    // Estrai tokenId dall'evento AssetDeposited
    let tokenId: string | undefined
    for (const log of receipt.logs) {
      try {
        const parsed = contract.interface.parseLog(log)
        if (parsed?.name === 'AssetDeposited') {
          tokenId = parsed.args.tokenId.toString()
          break
        }
      } catch {
        // log non parsabile, continua
      }
    }

    // Aggiorna deposito con tokenId NFT
    await prisma.deposit.update({
      where: { id: params.depositId },
      data: { nftTokenId: tokenId, status: 'APPRAISED' },
    })

    return { txHash: receipt.hash, tokenId }
  },

  async getAssetMetadata(tokenId: string) {
    const contract = this.getContract()
    const meta = await contract.getAssetMetadata(BigInt(tokenId))
    return {
      assetType: meta.assetType,
      weightGrams: Number(meta.weightGrams) / 100,
      valuationEUR: Number(meta.valuationEUR) / 100,
      depositTimestamp: new Date(Number(meta.depositTimestamp) * 1000).toISOString(),
      serialNumber: meta.serialNumber,
      description: meta.description,
    }
  },
}
