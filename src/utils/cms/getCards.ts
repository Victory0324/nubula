import { urlForImage } from '@/utils/cms/image';
import getDocs from './getDocs';

export type UniverseCard = {
  title: string;
  url: string | undefined;
  image: string;
  newTab: boolean;
  analyticsEventName: string;
};

export default async function getUniverseCards() {
  try {
    const { success, docs } = await getDocs({ tag: 'card', order: true });

    if (!success) throw 'Error getting universe cards';

    const cards = docs.map((c: any) => {
      return {
        url: c.url,
        title: c.title,
        image: urlForImage(c.image).url(),
        newTab: c.newTab,
        analyticsEventName: c.analyticsEventName,
      };
    });

    return {
      success: true,
      cards: cards as UniverseCard[],
    };
  } catch (err) {
    return {
      success: false,
      cards: [] as UniverseCard[],
      message: (err as Error).message,
    };
  }
}
