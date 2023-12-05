import { NextRequest, NextResponse } from 'next/server';
import { elyxnirRequest } from '../request';

export async function GET(request: NextRequest) {
  const res = await elyxnirRequest({
    request,
    path: `get-user`,
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

export async function DELETE(request: NextRequest) {
  return elyxnirRequest({
    request,
    path: `delete-user`,
    newApi: true,
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return elyxnirRequest({
    request,
    path: `update-user`,
    newApi: true,
    body,
  });
}
