import InventoryIcon from './assets/InventoryIcon';
import KorusIcon from './assets/KorusIcon';
import NebulaIcon from './assets/NebulaIcon';
import NavLink from './NavLink';
import ScenZIcon from './assets/ScenzIcon';
import GridIcon from '@/app/shared/assets/GridIcon';
import Tooltip from '@/app/shared/Tooltips/Tooltip';
import TrackFeed from '@/app/shared/assets/TrackFeed';
import Puzzle from '@/app/shared/assets/Puzzle';
import { useModal } from '@ebay/nice-modal-react';
import IframeModal from './IFrameModal';
import { useAnalytics } from '@/app/providers/analytics';
import { useMenu } from '@/app/providers/menu';
import UserName from '@/app/shared/Profile/UserName';
import Profile from '@/app/shared/Profile';

const DesktopMenuBar = () => {
  const iframeModal = useModal(IframeModal);
  const { track } = useAnalytics();
  const { isUniverseOpen, setIsUniverseOpen, isMenuOpen, setIsMenuOpen } =
    useMenu();
  return (
    <div className='hidden lg:flex flex-col justify-between items-center w-[75px] py-5 z-20'>
      <div className='mt-5 flex flex-col items-center justify-between w-full'>
        <div className='mb-3 relative'>
          <Profile />
          <div className='absolute top-[-5px] left-[67px] ml-5'>
            <UserName showRename={isUniverseOpen || isMenuOpen} />
          </div>
        </div>
        <div
          className={`w-full flex items-center justify-center border border-r-0 ${
            isUniverseOpen
              ? 'border-purple-9a bg-purple-9a/10 grid-mask transition-colors duration-500'
              : 'border-gray-10'
          }
          `}
        >
          <button
            className='py-4'
            onClick={() => setIsUniverseOpen(!isUniverseOpen)}
          >
            <GridIcon />
          </button>
        </div>
        <div className='mt-2'>
          <button
            className={` btn-burger ${isMenuOpen ? 'cross' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></button>
        </div>
      </div>
      <div className='flex flex-col '>
        <NavLink
          analyticsEventName='nebula'
          path='/nebula'
          icon={<NebulaIcon />}
          tooltipContent=' Use the Sound Nebula to discover stems available in KORUS and create with stems you have unlocked.'
        />
        <NavLink
          analyticsEventName='scenz'
          path='/scenz'
          icon={<ScenZIcon />}
          tooltipContent='Customize your KOR’s background via this inventory.'
        />
        <NavLink
          analyticsEventName='korus'
          path='/korus'
          icon={<KorusIcon />}
          tooltipContent='Choose your active KOR via this inventory.'
        />
        <NavLink
          analyticsEventName='inventory'
          path='/inventory'
          icon={<InventoryIcon />}
          tooltipContent='Access your saved, owned and favorited tracks here.'
        />
        <Tooltip
          content={
            'The Trackfeed shows all tracks made using KORUS, Top 20 tracks made, most liked and owned tracks. Find hidden gems using the Trackfeed!'
          }
        >
          <a
            onClick={(e) => {
              e.preventDefault();

              setIsUniverseOpen(false);
              track({
                category: 'page_flow',
                action: 'sidebar_launch',
                name: 'trackfeed',
              });
              iframeModal.show({
                siteName: 'Trackfeed',
                url: 'https://korus.co/trackfeed',
              });
            }}
            className={`mb-10 cursor-pointer transition-colors hover:text-white text-gray-84`}
          >
            <TrackFeed />
          </a>
        </Tooltip>
        <Tooltip
          content={
            'Access our quests platform to complete active quests and receive rewards!'
          }
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              setIsUniverseOpen(false);
              track({
                category: 'page_flow',
                action: 'sidebar_launch',
                name: 'quests',
              });
              iframeModal.show({
                siteName: 'Quests',
                url: 'https://quests.korus.co/',
              });
            }}
            className={`mb-10 cursor-pointer transition-colors hover:text-white text-gray-84`}
          >
            <Puzzle />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default DesktopMenuBar;
