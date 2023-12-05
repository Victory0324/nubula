import { KorIdentifier } from '@/app/providers/kors';
import { elyxnirRequest } from '../../../request';

const patchSelectedKor = async (props: KorIdentifier) => {
  const res = await elyxnirRequest(
    `inventory/kor/selected?korUnlockId=${props.korUnlockId}&selectedIndex=${props.selectedIndex}`,
    'PATCH',
    props
  );

  if (!res.ok) {
    console.error('Failed to fetch data');
    return { success: false };
  }

  return { success: true };
};

export default patchSelectedKor;
