import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json')

async function ensureFile() {
  try {
    await fs.access(WAITLIST_FILE)
  } catch {
    await fs.mkdir(path.dirname(WAITLIST_FILE), { recursive: true })
    await fs.writeFile(WAITLIST_FILE, '[]', 'utf-8')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254)

    await ensureFile()

    const content = await fs.readFile(WAITLIST_FILE, 'utf-8')
    const waitlist: Array<{ email: string; timestamp: string }> = JSON.parse(content)

    if (waitlist.some((entry) => entry.email === sanitizedEmail)) {
      return NextResponse.json({ message: 'Already on the waitlist' }, { status: 200 })
    }

    waitlist.push({ email: sanitizedEmail, timestamp: new Date().toISOString() })
    await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2), 'utf-8')

    return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
