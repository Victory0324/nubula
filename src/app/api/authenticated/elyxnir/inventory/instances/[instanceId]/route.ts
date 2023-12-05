import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';
import { PatchInstanceValues } from '@/utils/api/authenticated/elyxnir/inventory/patchInstance';

export async function GET(
  request: NextRequest,
  { params }: { params: { instanceId: string } }
) {
  const instanceId = params.instanceId;

  return await elyxnirRequest({
    request,
    path: `inventory/instance/${instanceId}`,
    newApi: true,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { instanceId: string } }
) {
  const instanceId = params.instanceId;

  const res = await elyxnirRequest({
    request,
    path: `inventory/instances/${instanceId}`,
    newApi: true,
  });

  return res;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { instanceId: string } }
) {
  const instanceId = params.instanceId;
  const body = (await request.json()) as PatchInstanceValues;

  const res = await elyxnirRequest({
    request,
    path: `inventory/instances/${instanceId}`,
    body,
    newApi: true,
  });

  return res;
}
