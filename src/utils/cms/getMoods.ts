import getDocs from './getDocs';

export default async function getMoods() {
  try {
    const { success, docs } = await getDocs({ tag: 'moods', order: true });

    if (!success) throw 'Error getting universe moods';

    const moods = docs
      .map(({ moods }: { moods: string }) => moods.split('\n'))
      .flat();

    return {
      success: true,
      moods: moods as string[],
    };
  } catch (err) {
    return {
      success: false,
      moods: [] as string[],
      message: (err as Error).message,
    };
  }
}
