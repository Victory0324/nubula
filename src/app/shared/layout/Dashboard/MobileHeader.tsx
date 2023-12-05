import { Link } from '@/app/providers/router';
import { cloneElement, useMemo } from 'react';
import DownArrow from '../../assets/DownArrow';
import { Menu } from '@headlessui/react';
import NebulaIcon from '../../assets/NebulaIcon';
import { usePathname } from 'next/navigation';
import ScenZIcon from './ContentWrapper/assets/ScenzIcon';
import KorusIcon from './ContentWrapper/assets/KorusIcon';
import InventoryIcon from './ContentWrapper/assets/InventoryIcon';
import { useModal } from '@ebay/nice-modal-react';
import IframeModal from './ContentWrapper/IFrameModal';
import Puzzle from '@/app/shared/assets/Puzzle';
import TrackFeed from '../../assets/TrackFeed';
import GridIcon from '../../assets/GridIcon';
import useOnScreen from '@/utils/hooks/dom/useOnScreen';
import { useAnalytics } from '@/app/providers/analytics';
import { useMenu } from '@/app/providers/menu';
import UserName from '../../Profile/UserName';
import WalletAddress from '../../Profile/WalletAddress';
import MobileProfile from '../../Profile/MobileProfile';

const PathMap = [
  {
    path: '/nebula',
    analyticsEventName: 'nebula',
    icon: <NebulaIcon />,
    title: 'SOUND NEBULA',
  },
  {
    path: '/output',

    analyticsEventName: 'output',
    icon: <NebulaIcon />,
    title: 'OUTPUT',
  },
  {
    path: '/scenz',
    analyticsEventName: 'scenz',
    icon: <ScenZIcon width={24} height={24} />,
    title: 'SCENZ',
  },
  {
    path: '/korus',
    analyticsEventName: 'korus',
    icon: <KorusIcon />,
    title: 'KOR INVENTORY',
  },
  {
    path: '/inventory',
    analyticsEventName: 'inventory',
    icon: <InventoryIcon />,
    title: 'TRACK INVENTORY',
  },
];

const MobileHeader: React.FC = () => {
  const pathname = usePathname();
  const iframeModal = useModal(IframeModal);
  const {
    isUniverseOpen,
    setIsUniverseOpen,
    isMenuOpen,
    setIsMenuOpen,
    universeSubHeadingRef,
  } = useMenu();
  const isVisible = useOnScreen(universeSubHeadingRef);

  const { track } = useAnalytics();

  const currentPage = useMemo(() => {
    if (!pathname) return undefined;

    const currentPath = PathMap.find((page) => page.path === pathname);

    if (!currentPath) {
      throw `Need to implement mobile header for ${pathname}`;
    }

    const icon = cloneElement(currentPath?.icon, {
      className: 'text-purple-9a',
    });

    return { ...currentPath, icon };
  }, [pathname]);

  return (
    <div className={`lg:hidden bg-gray-10`}>
      <div
        className={`w-full h-full flex items-center text-center py-2 transition-colors ${
          isUniverseOpen ? 'bg-purple-9a/20' : 'bg-transparent'
        }`}
      >
        <div
          className={`flex ml-2 items-center ${
            isUniverseOpen ? 'w-full' : ''
          } h-[71px]`}
        >
          <MobileProfile />
        </div>
        <div
          className='
          relative
          w-1/2
          flex grow
          justify-center items-center
          text-xs
        '
        >
          <Menu as='div' className='relative w-full'>
            {({ open }) => (
              <div>
                <div>
                  {!isUniverseOpen && (
                    <Menu.Button className='hover:text-white/75 transition-colors font-medium inline-flex rounded-md py-2 text-xs text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center gap-2'>
                      <span>{currentPage?.icon}</span>
                      <span className='mx-2'>{currentPage?.title}</span>
                      <DownArrow />
                    </Menu.Button>
                  )}
                </div>
                {open && (
                  <Menu.Items
                    className='bg-gray-10 border border-gray-999 rounded-2xl w-54 -right-0 -left-0 absolute mt-2 divide-y divide-white/25 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 flex flex-col'
                    static
                  >
                    {PathMap.filter(
                      (item) =>
                        item.title !== 'OUTPUT' &&
                        item.title !== currentPage?.title
                    ).map((item, i) => (
                      <Menu.Item key={i}>
                        <Link
                          href={item.path}
                          onClick={() => {
                            setIsUniverseOpen(false);
                            track({
                              category: 'page_flow',
                              action: 'navbar_launch',
                              name: item.analyticsEventName,
                            });
                          }}
                          className='flex gap-2 h-[40px] items-center px-5'
                        >
                          <span>{item.icon}</span>
                          <span className='mx-2'>{item.title}</span>
                        </Link>
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      <span
                        className='flex gap-2 h-[40px] items-center px-5 uppercase'
                        onClick={() => {
                          setIsUniverseOpen(false);

                          track({
                            category: 'page_flow',
                            action: 'navbar_launch',
                            name: 'trackfeed',
                          });

                          iframeModal.show({
                            siteName: 'Trackfeed',
                            url: 'https://korus.co/trackfeed',
                          });
                        }}
                      >
                        <span>
                          <TrackFeed width={24} height={24} />
                        </span>
                        <span className='block mx-2'>Trackfeed</span>
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span
                        className='flex gap-2 h-[40px] items-center px-5 uppercase'
                        onClick={() => {
                          setIsUniverseOpen(false);
                          track({
                            category: 'page_flow',
                            action: 'navbar_launch',
                            name: 'quests',
                          });

                          iframeModal.show({
                            siteName: 'Quests',
                            url: 'https://quests.korus.co/',
                          });
                        }}
                      >
                        <span>
                          <Puzzle width={24} height={24} />
                        </span>
                        <span className='block mx-2'>Quests</span>
                      </span>
                    </Menu.Item>
                  </Menu.Items>
                )}
              </div>
            )}
          </Menu>
        </div>
        <div className='relative flex justify-center mr-5'>
          <div className='flex items-center gap-2'>
            <button
              className='py-4'
              onClick={() => setIsUniverseOpen(!isUniverseOpen)}
            >
              <GridIcon />
            </button>
            <button
              className={`btn-burger ${isMenuOpen ? 'cross' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
