import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_not_for_production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export const authService = {
  async register(data: { email: string; password: string; walletAddress?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) throw new Error('EMAIL_EXISTS')

    const passwordHash = await bcrypt.hash(data.password, 12)
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        walletAddress: data.walletAddress || null,
        role: 'USER',
        kycStatus: 'PENDING',
      },
    })

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        kycStatus: user.kycStatus,
      },
    }
  },

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) throw new Error('INVALID_CREDENTIALS')

    const valid = await bcrypt.compare(data.password, user.passwordHash)
    if (!valid) throw new Error('INVALID_CREDENTIALS')

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        kycStatus: user.kycStatus,
      },
    }
  },

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        walletAddress: true,
        kycStatus: true,
        role: true,
        createdAt: true,
        _count: { select: { deposits: true } },
      },
    })
    if (!user) throw new Error('NOT_FOUND')
    return user
  },

  verifyToken(token: string): { userId: string; role: string } {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
  },
}
