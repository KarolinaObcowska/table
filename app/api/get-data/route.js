import { NextResponse } from 'next/server'

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  const response = await fetch(`https://api.b2bshare.online/Feed/Test?${searchParams}`)

  const data = await response.json()

  return NextResponse.json({ data }, { status: 200, statusText: 'OK' })
}
