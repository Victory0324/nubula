import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Tooltip from '@/app/shared/Tooltips/Tooltip';
import { useRouter } from '@/app/providers/router';
import { useAnalytics } from '@/app/providers/analytics';
import { useMenu } from '@/app/providers/menu';

export default function NavLink({
  icon,
  path,
  tooltipContent,
  analyticsEventName,
}: {
  icon: React.ReactNode;
  path: string;
  tooltipContent: string;
  analyticsEventName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { track } = useAnalytics();
  const { setIsUniverseOpen } = useMenu();

  useEffect(() => {
    router.prefetch(path);
  }, [path, router]);

  return (
    <Tooltip content={tooltipContent}>
      <a
        href={path}
        onClick={(e) => {
          // ideally we'd be doing
          // this with a hook.
          // but there is no routeChangeStart
          // event with app router.
          e.preventDefault();
          track({
            category: 'page_flow',
            action: 'sidebar_launch',
            name: analyticsEventName,
          });
          router.push(path);
          setIsUniverseOpen(false);
        }}
        className={`mb-10  cursor-pointer transition-colors hover:text-white ${
          pathname === path ? 'text-purple-9a' : 'text-gray-84'
        }`}
      >
        {icon}
      </a>
    </Tooltip>
  );
}
