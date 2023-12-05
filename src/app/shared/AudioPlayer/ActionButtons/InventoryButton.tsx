import { Link } from '@/app/providers/router';

export default function InventoryButton() {
  return (
    <Link href='/inventory'>
      <button className='btn btn-secondary btn-pinched-br w-full py-2'>
        Inventory
      </button>
    </Link>
  );
}
