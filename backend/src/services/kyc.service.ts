import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const kycService = {
  async submitKyc(
    userId: string,
    documents: {
      docFront: string
      docBack?: string
      selfie: string
    }
  ) {
    // Salva i documenti nel database
    await prisma.kycDocument.createMany({
      data: [
        { userId, documentType: 'doc_front', documentUrl: documents.docFront },
        ...(documents.docBack ? [{ userId, documentType: 'doc_back', documentUrl: documents.docBack }] : []),
        { userId, documentType: 'selfie', documentUrl: documents.selfie },
      ],
    })

    // Aggiorna stato KYC utente a SUBMITTED
    await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'SUBMITTED' },
    })

    // Stub integrazione Sumsub — in produzione:
    // const sumsubResult = await sumsubApi.createApplicant(userId, documents)
    // await prisma.kycDocument.update({ where: { ... }, data: { sumsubId: sumsubResult.id } })

    return {
      message: 'Documenti ricevuti. Verifica in corso entro 24 ore.',
      status: 'SUBMITTED',
    }
  },

  async getKycStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        kycStatus: true,
        kycDocuments: {
          select: { documentType: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!user) throw new Error('NOT_FOUND')

    return {
      kycStatus: user.kycStatus,
      documentsSubmitted: user.kycDocuments.length > 0,
      lastSubmission: user.kycDocuments[0]?.createdAt || null,
    }
  },

  async updateKycStatus(userId: string, status: 'APPROVED' | 'REJECTED') {
    return prisma.user.update({
      where: { id: userId },
      data: { kycStatus: status },
    })
  },
}
