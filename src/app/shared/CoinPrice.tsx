import SmallCoin from './assets/SmallCoin';

export default function CoinPrice({ price }: { price: number }) {
  return (
    <div className='flex gap-2 items-center'>
      <SmallCoin />
      <span className='font-bold text-[15px]'>{price}</span>
    </div>
  );
}
