import Loading from '../../assets/Loading';
import ModalBody from '../../Modal/ModalBody';
import ModalHeader from '../../Modal/ModalHeader';
import useChangeWallet from '@/utils/hooks/wallet/useChangeWallet';
import { useKors } from '@/app/providers/kors';

export default function ClaimModal({ onClick }: { onClick: Function }) {
  const { isGenKorUnlocked, loading } = useKors();

  const changeWallet = useChangeWallet();

  if (loading) return <Loading className='text-white' />;

  return (
    <ModalBody className='max-w-[357px]'>
      <ModalHeader title='GenKOR is your passport to KORUS!' />
      <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
        Unlock to access 10,000+ stems and endless music creation.
      </div>
      <div className='flex flex-col gap-2'>
        <button
          className='btn btn-primary btn-pinched-br'
          onClick={() => onClick()}
        >
          {isGenKorUnlocked ? 'Claim GenKOR' : 'Unlock GenKOR for free'}
        </button>
        <button
          className='btn btn-secondary btn-pinched-br'
          onClick={changeWallet}
        >
          Change Wallet
        </button>
      </div>
    </ModalBody>
  );
}
