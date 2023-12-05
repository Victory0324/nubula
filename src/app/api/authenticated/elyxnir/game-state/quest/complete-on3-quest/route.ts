import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as On3Quest;

  const res = await elyxnirRequest({
    request,
    path: `game-state/api/quest/complete-on3-quest`,
    body,
  });

  if (res.status === 400) {
    // the user has already
    // completed this quest.
    // return a 204 as it's
    // more intuitive for the client
    return new Response(null, {
      status: 204,
    });
  }
  return res;
}
