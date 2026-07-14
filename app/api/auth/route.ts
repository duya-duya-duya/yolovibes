import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return NextResponse.json({ token });
  }
  return NextResponse.json({ error: '密码错误' }, { status: 401 });
}