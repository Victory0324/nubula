import { NextRequest, NextResponse } from 'next/server';
import { elyxnirRequest } from '../../request';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await elyxnirRequest({
    request,
    path: `currency/${params.id}`,
    newApi: true,
  });

  try {
    return NextResponse.json(await res.json(), {
      status: res.status,
    });
  } catch (e) {
    console.error(e);
    return res;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const res = await elyxnirRequest({
    request,
    path: `currency/${params.id}`,
    body,
    newApi: true,
  });

  try {
    return NextResponse.json(await res.json(), {
      status: res.status,
    });
  } catch (e) {
    console.error(e);
    return res;
  }
}
