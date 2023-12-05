import { useCurrency } from '@/app/providers/currency';

export default function NoizeBalance() {
  const { noizBalance } = useCurrency();

  if (noizBalance === undefined) return <></>;

  return (
    <div className='text-[15px] text-transparent bg-clip-text bg-gradient-to-br from-[#D78F22] via-[#F9CA83] to-[#D78F22]'>
      {noizBalance}
    </div>
  );
}
