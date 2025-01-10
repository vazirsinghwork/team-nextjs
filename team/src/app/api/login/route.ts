import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
export async function loginAPi(req: NextRequest) {
  const { username, password } = await req.json();

  // Mock credentials
  if (username === 'user' && password === 'password') {
    return NextResponse.json({ username });
  }

  return NextResponse.json(
    { error: 'Invalid username or password' },
    { status: 401 }
  );
}