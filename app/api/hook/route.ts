import { NextRequest, NextResponse } from 'next/server';
import { updateKVStore } from '../../../lib/updateKVStore';

export async function POST(request: NextRequest) {
  await updateKVStore();
  return NextResponse.json({ message: 'KV store updated' });
}