import { useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import { useModal } from '@ebay/nice-modal-react';
import IframeModal from '../layout/Dashboard/ContentWrapper/IFrameModal';
import { useRouter } from '@/app/providers/router';
import { useAnalytics } from '@/app/providers/analytics';
import { useMenu } from '@/app/providers/menu';
import { useCurrency } from '@/app/providers/currency';
import { isDevOrPreview } from '@/utils/helpers/env';

const Card = ({
  title,
  image,
  url,
  analyticsEventName,
  newTab = false,
}: {
  title: string;
  image: StaticImageData | string;
  url: string | undefined;
  analyticsEventName: string | undefined;
  newTab?: boolean;
}) => {
  const iframeModal = useModal(IframeModal);
  const { setIsUniverseOpen } = useMenu();
  const router = useRouter();
  const { track } = useAnalytics();
  const { claimReward } = useCurrency();

  const onClick = useCallback(() => {
    if (analyticsEventName) {
      track({
        category: 'page_flow',
        action: 'dashboard_launch',
        name: analyticsEventName,
      });
    }

    if (url) {
      if (newTab) {
        window.open(url, '_blank');
      } else {
        if (isAbsoluteUrl(url)) {
          // iframe
          iframeModal.show({ url, siteName: title });
        } else {
          setIsUniverseOpen(false);
          claimReward(isDevOrPreview() ? 'daily-unlimited' : 'daily');
          router.push(url);
        }
      }
    }
  }, [
    analyticsEventName,
    url,
    track,
    newTab,
    iframeModal,
    title,
    setIsUniverseOpen,
    claimReward,
    router,
  ]);

  return (
    <a
      href={url}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className='h-[216px] lg:h-[448px] w-full bg-purple-9a overflow-hidden rounded-xl relative transform transition duration-500 hover:scale-105 drop-shadow-md'>
        <Image alt={`Card ${title} backgound image`} src={image} fill={true} />
        <div className='absolute top-20 w-full px-2 lg:px-8 text-center'>
          <span className='text-3xl font-bold leading-7 whitespace-pre-wrap'>
            {title}
          </span>
        </div>
        {!url && <div className='absolute w-full h-full bg-black/70'></div>}

        {!url && (
          <div className='absolute w-full text-center z-10 top-1/2 transform -translate-y-1/2'>
            <span className='text-3xl font-bold leading-7'>Coming Soon</span>
          </div>
        )}
      </div>
    </a>
  );
};

export default Card;
