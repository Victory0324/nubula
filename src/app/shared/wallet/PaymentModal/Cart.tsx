import { getMintPrices } from '@/utils/helpers/mints';

export default function Cart({
  itemName,
  quantity,
  showQuantity = true,
  step,
  mintPrice,
  collectionName,
}: {
  itemName: string;
  quantity: number;
  showQuantity: boolean;
  step: string;
  mintPrice?: MintPrice;
  collectionName?: string;
}) {
  const { fiat, crypto } = getMintPrices({ mintPrice, quantity });

  return (
    <div className='rounded-2xl border border-gray-999 bg-gray-20 p-4 flex justify-between gap-4 w-full'>
      <div>
        <div className='text-white/50'>Item</div>
        <div className='font-semibold text-white'>
          {showQuantity ? quantity : ''} {itemName}
        </div>
      </div>
      <div>
        <div className='text-white/50'>Collection</div>
        <div className='font-semibold text-white'>
          {collectionName || itemName}
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-white/50'>Price</div>
        <div className='font-semibold text-white'>
          {step === 'creditCardCheckout' ? fiat : crypto}
        </div>
      </div>
    </div>
  );
}
