import getUniverseCards from './getCards';
import getMoods from './getMoods';

export default async function getCmsContent() {
  const { cards } = await getUniverseCards();
  const { moods } = await getMoods();

  return { cards, moods };
}
