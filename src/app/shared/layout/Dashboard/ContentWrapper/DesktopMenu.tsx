import { useCallback, useMemo, useState } from 'react';
import MenuLinkButton from '@/app/shared/Buttons/MenuLinkButton';
import DeepLinkModal, { DeepLinkModalProps } from './DeepLinkModal';
import { useCurrentUser } from '@/app/providers/User';
import MenuButtons from './MenuButtons';
import LogOutIcon from './assets/LogOutIcon';
import WalletAddress from '@/app/shared/Profile/WalletAddress';
import { useMenu } from '@/app/providers/menu';
import UserName from '@/app/shared/Profile/UserName';

const DesktopMenu: React.FC = () => {
  const [deepLinkModalProps, setDeepLinkModalProps] =
    useState<DeepLinkModalProps>({
      isOpen: false,
      siteName: '',
      url: '',
    });

  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const { logout } = useCurrentUser();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <>
      <div
        className={`
      flex
      flex-col
      fixed
      h-full

      w-[100vw] lg:w-[400px]
      lg:pr-[40px]
      lg:mr-5

      transition-opacity duration-500
      pb-5 lg:pb-0

      ${isMenuOpen ? 'opacity-100 z-10' : 'opacity-0 invisible'}

      overflow-hidden
    `}
      >
        <div
          className='
            bg-gray-10
            h-full
            flex
            flex-col
            justify-between
            overflow-y-scroll
            no-scrollbar
          '
        >
          <div>
            <div className='max-sm:rounded-md bg-white/10 p-5 mb-5 flex flex-col gap-2 lg:pt-[105px]'>
              <div className='lg:hidden'>
                <UserName showRename={true} />
              </div>
              <WalletAddress />
            </div>
            <div className='overflow-y-scroll no-scrollbar px-5'>
              <MenuButtons
                setIsMenuOpen={setIsMenuOpen}
                setDeepLinkModalProps={setDeepLinkModalProps}
              />
            </div>
          </div>
          <div className='my-10 px-5'>
            <MenuLinkButton
              className='mb-6'
              onClick={handleLogout}
              icon={<LogOutIcon className='rotate-180' />}
            >
              Log out
            </MenuLinkButton>
            <div
              className='
              flex

              text-gray-999

              text-sm
              font-light

              justify-around

              cursor-pointer'
            >
              <a
                href='https://pixelynx.io/privacy-policy'
                className='hover:text-white transition-colors text-xs'
              >
                Privacy policy
              </a>
              <a
                href='https://pixelynx.io/terms-and-conditions'
                className='hover:text-white transition-colors text-xs'
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
      {deepLinkModalProps.isOpen && (
        <DeepLinkModal
          {...deepLinkModalProps}
          close={() => {
            setDeepLinkModalProps({
              isOpen: false,
              siteName: '',
              url: '',
            });
          }}
        />
      )}
    </>
  );
};

export default DesktopMenu;
