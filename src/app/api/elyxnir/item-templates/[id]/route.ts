import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}inventory/item-templates/${params.id}`
  );

  try {
    return NextResponse.json(await res.json(), {
      status: res.status,
    });
  } catch (e) {
    console.error(e);
    return res;
  }
};
