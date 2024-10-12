import { NextResponse } from 'next/server';
import { getRegisters } from '@/server/api';

export async function GET() {
  const data = getRegisters();
  return NextResponse.json(data);
}
