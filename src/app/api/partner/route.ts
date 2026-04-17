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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessName, city, email, phone, message } = body

    if (!businessName || typeof businessName !== 'string' || !businessName.trim()) {
      return NextResponse.json({ error: 'Business name is required' }, { status: 400 })
    }
    if (!city || typeof city !== 'string' || !city.trim()) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const entry = {
      businessName: businessName.trim().slice(0, 200),
      city: city.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 254),
      phone: typeof phone === 'string' ? phone.trim().slice(0, 30) : '',
      message: typeof message === 'string' ? message.trim().slice(0, 1000) : '',
      timestamp: new Date().toISOString(),
    }

    await ensureFile()

    const content = await fs.readFile(PARTNERS_FILE, 'utf-8')
    const partners: typeof entry[] = JSON.parse(content)

    partners.push(entry)
    await fs.writeFile(PARTNERS_FILE, JSON.stringify(partners, null, 2), 'utf-8')

    return NextResponse.json({ message: 'Application received' }, { status: 201 })
  } catch (error) {
    console.error('Partner API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
