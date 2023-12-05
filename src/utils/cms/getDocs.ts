import { isSanityDebug } from '../helpers/env';
import { client } from '@/utils/cms/client';

export default async function getDocs({
  tag,
  order,
}: {
  tag: string;
  order?: boolean;
}) {
  try {
    const docs = await client
      .withConfig({
        fetch: {
          cache: isSanityDebug() ? 'no-cache' : 'default',
          next: { tags: [tag] },
        },
      })
      .fetch(
        `*[_type=="${tag}" && !(_id in path("drafts.**"))]${
          order ? '|order(orderRank)' : ''
        }`
      );

    return {
      success: true,
      docs,
    };
  } catch (err) {
    return {
      success: false,
      docs: [],
      message: (err as Error).message,
    };
  }
}
