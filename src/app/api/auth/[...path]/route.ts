import { NextRequest, NextResponse } from 'next/server';

// Use Vercel backend as default if env not set
const BACKEND_URL = process.env.BACKEND_URL || 'https://an-nahda-backend.vercel.app/api/auth';

export async function POST(req: NextRequest, context: { params: { path: string[] } }) {
  const { params } = context;
  const path = params.path.join('/');
  const url = `${BACKEND_URL}/${path}`;
  const body = await req.text();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('content-type') || 'application/json',
      cookie: req.headers.get('cookie') || '',
      authorization: req.headers.get('authorization') || '',
    },
    body,
    credentials: 'include',
  });

  const data = await res.text();
  const response = new NextResponse(data, { status: res.status });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) response.headers.set('set-cookie', setCookie);
  return response;
}

export async function GET(req: NextRequest, context: { params: { path: string[] } }) {
  const { params } = context;
  const path = params.path.join('/');
  const url = `${BACKEND_URL}/${path}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      cookie: req.headers.get('cookie') || '',
      authorization: req.headers.get('authorization') || '',
    },
    credentials: 'include',
  });

  const data = await res.text();
  const response = new NextResponse(data, { status: res.status });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) response.headers.set('set-cookie', setCookie);
  return response;
}
