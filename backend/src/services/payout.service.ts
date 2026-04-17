import { ethers } from 'ethers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ABI minimale ERC-20 per transfer e decimals
const ERC20_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address account) view returns (uint256)',
]

export const payoutService = {
  async executePayout(
    depositId: string,
    walletAddress: string,
    currency: 'USDC' | 'USDT'
  ) {
    const deposit = await prisma.deposit.findUnique({
      where: { id: depositId },
      include: { user: true, payout: true },
    })

    if (!deposit) throw new Error('Deposito non trovato')
    if (deposit.status !== 'APPRAISED') {
      throw new Error('Il deposito deve essere nello stato APPRAISED per eseguire il payout')
    }
    if (deposit.payout) {
      throw new Error('Payout già eseguito per questo deposito')
    }

    const amountEUR = deposit.appraisedValue || deposit.estimatedValue
    const rpcUrl = process.env.POLYGON_RPC_URL
    const privateKey = process.env.TREASURY_PRIVATE_KEY
    const contractAddress = currency === 'USDC'
      ? (process.env.USDC_ADDRESS || '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174')
      : (process.env.USDT_ADDRESS || '0xc2132D05D31c914a87C6611C10748AEb04B58e8F')

    if (!rpcUrl || !privateKey || privateKey.includes('0000000000000000000000000000000000000000000000000000000000000000')) {
      throw new Error('Configurazione blockchain non configurata. Imposta POLYGON_RPC_URL e TREASURY_PRIVATE_KEY.')
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const signer = new ethers.Wallet(privateKey, provider)
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, signer)

    // USDC e USDT su Polygon hanno 6 decimali
    const decimals: number = await contract.decimals()
    // In produzione: usare un oracle FX per conversione EUR → USD
    const amount = ethers.parseUnits(amountEUR.toFixed(2), decimals)

    // Verifica saldo treasury prima di inviare
    const balance: bigint = await contract.balanceOf(signer.address)
    if (balance < amount) {
      throw new Error(`Saldo treasury insufficiente (${ethers.formatUnits(balance, decimals)} ${currency})`)
    }

    const tx = await contract.transfer(walletAddress, amount)
    const receipt = await tx.wait()

    // Registra payout nel database
    const payout = await prisma.payout.create({
      data: {
        depositId,
        userId: deposit.userId,
        amount: amountEUR,
        currency,
        txHash: receipt.hash,
        walletAddress,
        status: 'COMPLETED',
      },
    })

    // Aggiorna stato deposito a PAID
    await prisma.deposit.update({
      where: { id: depositId },
      data: { status: 'PAID' },
    })

    return { txHash: receipt.hash, amount: amountEUR, currency, payout }
  },
}
