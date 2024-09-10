import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Exclude the proxy-status path from rewrites to show our page from '/page.tsx'
  if (path === '/proxy-status') {
    return NextResponse.next();
  }

  const rewrite = await kv.get(`rewrite:${path}`);

  if (rewrite) {
    const response = NextResponse.redirect(new URL(rewrite as string, request.url));

    // if CORS is an issue, we need to add headers -- but those can't be generic. let's discuss further.
    // response.headers.set('Access-Control-Allow-Origin', '*');
    // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } else {
    return new NextResponse('Not found', { status: 404 });
  }
}