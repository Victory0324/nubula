import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return elyxnirRequest({
    request,
    path: `inventory/item-templates/${params.id}`,
    newApi: true,
  });
}
