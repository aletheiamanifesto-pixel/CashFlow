import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const PARTNERS_FILE = path.join(process.cwd(), 'data', 'partners.json')

async function ensureFile() {
  try {
    await fs.access(PARTNERS_FILE)
  } catch {
    await fs.mkdir(path.dirname(PARTNERS_FILE), { recursive: true })
    await fs.writeFile(PARTNERS_FILE, '[]', 'utf-8')
  }
}

export interface PartnerApplication {
  businessName: string
  contactName: string
  email: string
  phone?: string
  city: string
  country: string
  monthlyVolume?: string
  message?: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessName, contactName, email, phone, city, country, monthlyVolume, message } = body

    if (!businessName || typeof businessName !== 'string' || businessName.trim().length === 0) {
      return NextResponse.json({ error: 'Business name is required' }, { status: 400 })
    }
    if (!contactName || typeof contactName !== 'string' || contactName.trim().length === 0) {
      return NextResponse.json({ error: 'Contact name is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 })
    }
    if (!country || typeof country !== 'string' || country.trim().length === 0) {
      return NextResponse.json({ error: 'Country is required' }, { status: 400 })
    }

    const entry: PartnerApplication = {
      businessName: businessName.trim().slice(0, 200),
      contactName: contactName.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 254),
      phone: phone ? String(phone).trim().slice(0, 50) : undefined,
      city: city.trim().slice(0, 100),
      country: country.trim().slice(0, 100),
      monthlyVolume: monthlyVolume ? String(monthlyVolume).trim().slice(0, 100) : undefined,
      message: message ? String(message).trim().slice(0, 2000) : undefined,
      timestamp: new Date().toISOString(),
    }

    await ensureFile()

    const content = await fs.readFile(PARTNERS_FILE, 'utf-8')
    const partners: PartnerApplication[] = JSON.parse(content)

    partners.push(entry)
    await fs.writeFile(PARTNERS_FILE, JSON.stringify(partners, null, 2), 'utf-8')

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
