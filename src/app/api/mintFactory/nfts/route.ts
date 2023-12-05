import { NextRequest, NextResponse } from 'next/server';
import { mintFactoryFetch } from '../fetch';

export async function GET(request: NextRequest) {
  const walletAddress = request.nextUrl.searchParams.get('walletAddress');
  const include = request.nextUrl.searchParams.get('include');
  const skip = request.nextUrl.searchParams.get('skip');
  const take = request.nextUrl.searchParams.get('take');

  const response = await mintFactoryFetch(
    `nfts?walletAddress=${walletAddress}&include=${include}&skip=${skip}&take=${take}`
  );

  if (!response.ok) {
    return response;
  }

  const json = await response.json();

  return NextResponse.json(json, { status: response.status });
}
