import nightSky from './night-sky.png';
import Image from 'next/image';
import WalletAddress from '../Profile/WalletAddress';
import UserName from '../Profile/UserName';
import Card from './Card';
import { useCMS } from '@/app/providers/cms';
import { useMenu } from '@/app/providers/menu';
import Profile from '../Profile';

const Universe = ({ showProfile }: { showProfile?: boolean }) => {
  const { cards } = useCMS();
  const { universeSubHeadingRef } = useMenu();

  return (
    <>
      <Image src={nightSky} alt='night sky background' fill={true} />
      <div className='relative w-full h-full flex flex-col justify-between z-10 border-purple-9a bg-purple-9a/10'>
        <div className='overflow-y-scroll no-scrollbar flex-grow'>
          <div>
            <div className='lg:p-5 w-full flex flex-col justify-between'>
              <div
                className={`flex gap-4 flex-col lg:flex-row justify-between lg:mt-5 ${
                  showProfile ? 'items-center' : ''
                }`}
              >
                <div
                  ref={universeSubHeadingRef}
                  className={`flex gap-2 items-center w-full lg:w-auto border-white/10 bg-purple-9a/10 border-b lg:bg-transparent lg:border-b-0 ${
                    showProfile ? 'max-sm:p-2' : 'max-sm:hidden mt-[65px]'
                  }`}
                >
                  {showProfile && (
                    <div className='shrink-0'>
                      <Profile />
                    </div>
                  )}
                  <div className='flex flex-col w-full lg:w-auto gap-1'>
                    {showProfile && <UserName showRename={true} />}

                    <WalletAddress />
                  </div>
                </div>
                <div className='hidden lg:block w-full lg:w-auto text-2xl font-bold text-center'>
                  Welcome to KORUS
                </div>
                <div className='flex items-center gap-2 justify-center min-w-[300px]'></div>
                {/* mobile header */}
                <div className='lg:hidden text-2xl font-bold text-center mb-3'>
                  KORUS
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24 px-2 lg:px-4'>
              {cards.map((card, i) => {
                return (
                  <Card
                    key={i}
                    title={card.title}
                    image={card.image}
                    url={card.url}
                    analyticsEventName={card.analyticsEventName}
                    newTab={card.newTab}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Universe;
