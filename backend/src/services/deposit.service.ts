import { PrismaClient, DepositStatus } from '@prisma/client'

const prisma = new PrismaClient()

// Macchina a stati per i depositi
// PENDING → RECEIVED → APPRAISED → PAID
// Qualsiasi stato → REJECTED
const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['RECEIVED', 'REJECTED'],
  RECEIVED: ['APPRAISED', 'REJECTED'],
  APPRAISED: ['PAID', 'REJECTED'],
  PAID: [],
  REJECTED: [],
}

export const depositService = {
  async createDeposit(
    userId: string,
    data: {
      type: string
      description: string
      estimatedWeight: number
      preferredCurrency?: string
      walletAddress?: string
    },
    photos: string[] = []
  ) {
    return prisma.deposit.create({
      data: {
        userId,
        type: data.type,
        description: data.description,
        estimatedWeight: data.estimatedWeight,
        estimatedValue: 0, // sarà calcolato dal perito
        preferredCurrency: data.preferredCurrency || 'USDC',
        photos,
        status: 'PENDING',
      },
    })
  },

  async getDeposits(userId: string) {
    return prisma.deposit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { payout: true },
    })
  },

  async getDepositById(id: string, userId: string) {
    return prisma.deposit.findFirst({
      where: { id, userId },
      include: { payout: true },
    })
  },

  async getDepositByIdAdmin(id: string) {
    return prisma.deposit.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, walletAddress: true, kycStatus: true } },
        payout: true,
      },
    })
  },

  async getAllDeposits() {
    return prisma.deposit.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, email: true, walletAddress: true, kycStatus: true } },
        payout: true,
      },
    })
  },

  async updateStatus(id: string, newStatus: string, requesterId: string) {
    const deposit = await prisma.deposit.findUnique({ where: { id } })
    if (!deposit) throw new Error('NOT_FOUND')

    // Verifica transizione di stato valida
    const allowed = VALID_TRANSITIONS[deposit.status] || []
    if (!allowed.includes(newStatus)) {
      throw new Error(`Transizione non valida: ${deposit.status} → ${newStatus}`)
    }

    return prisma.deposit.update({
      where: { id },
      data: {
        status: newStatus as DepositStatus,
        updatedAt: new Date(),
      },
    })
  },
}
