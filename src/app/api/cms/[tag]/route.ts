import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidateTag } from 'next/cache';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(
  req: NextRequest,
  { params }: { params: { tag: string } }
) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const body = await req.json();

  const tag = params.tag;

  if (!signature) {
    throw Error('no signature');
  }

  if (!SANITY_WEBHOOK_SECRET) {
    throw Error('Sanity webhook is not configured');
  }

  const isValid = isValidSignature(
    JSON.stringify(body),
    signature,
    SANITY_WEBHOOK_SECRET
  );

  // Validate signature
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    revalidateTag(tag);

    return NextResponse.json(
      { success: true, message: `revalidated tag ${tag}` },
      { status: 201 }
    );
  } catch (err) {
    // Could not revalidate. The stale page will continue to be shown until
    // this issue is fixed.
    return NextResponse.json(
      {
        success: false,
        message: `revalidated tag ${tag}: ${(err as Error).message}`,
      },
      { status: 500 }
    );
  }
}
