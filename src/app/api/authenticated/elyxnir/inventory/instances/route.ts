import { NextRequest, NextResponse } from 'next/server';
import { elyxnirRequest } from '../../request';
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') as Instance['type'];

  const response = await elyxnirRequest({
    request,
    path: `inventory/instances?type=${type}`,
    newApi: true,
  });

  if (!response.ok) {
    return response;
  }

  const json = await response.json();

  return NextResponse.json(json, { status: response.status });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as OutputTrack[];

  const res = await elyxnirRequest({
    request,
    path: `inventory/instances`,
    newApi: true,
    body,
  });

  return res;
}
