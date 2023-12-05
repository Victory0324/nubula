import useFavorite from '@/utils/hooks/instances/useFavorite';

import Heart from '@/app/shared/assets/Heart';
import Loading from '../assets/Loading';

const FavoriteButton = ({ newTrackName }: { newTrackName: string }) => {
  const { isFavorite, favorite, disabled, creating } = useFavorite({
    newTrackName,
  });

  return (
    <button
      disabled={disabled || creating}
      className='group hover:cursor-pointer hover:disabled:cursor-not-allowed'
      onClick={favorite}
    >
      {creating ? (
        <Loading />
      ) : (
        <Heart
          className={`${
            isFavorite ? 'text-purple-9a' : ''
          } group-disabled:text-gray-999/50 transition-colors`}
        />
      )}
    </button>
  );
};

export default FavoriteButton;
