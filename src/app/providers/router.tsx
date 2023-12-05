'use client';

import { useRouter as nextUseRouter } from 'next/navigation';
import { LinkProps } from 'next/link';
import {
  AppRouterInstance,
  NavigateOptions,
} from 'next/dist/shared/lib/app-router-context';
import React, {
  useCallback,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';

type RouteChangeHandler = (href: string, options?: NavigateOptions) => boolean;
type ContextType = AppRouterInstance & {
  beforeRouteChange: (handler: RouteChangeHandler) => () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const RouterContext = React.createContext<ContextType | undefined>(undefined);

export const RouterProvider = ({ children }: ProviderProps) => {
  const [beforeRouteChangeHandlers, setBeforeRouteChangeHandlers] = useState<
    RouteChangeHandler[]
  >([]);
  const router = nextUseRouter();

  const push = useCallback(
    (href: string, options?: NavigateOptions): boolean => {
      const results = beforeRouteChangeHandlers.map((handler) => {
        return handler(href, options);
      });

      if (results.every((r) => r)) {
        // if all handlers return true we are good to navigate
        router.push(href, options);
        return true;
      }

      return false;
    },
    [router, beforeRouteChangeHandlers]
  );

  const beforeRouteChange = useCallback((handler: RouteChangeHandler) => {
    // return a function to remove the event handler
    setBeforeRouteChangeHandlers((prev) => [...prev, handler]);

    return () => {
      setBeforeRouteChangeHandlers((handlers) =>
        handlers.filter((f) => f != handler)
      );
    };
  }, []);

  return (
    <RouterContext.Provider
      value={{
        ...router,
        push,
        beforeRouteChange,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): ContextType => {
  const context = useContext(RouterContext);
  if (!context)
    throw new Error('Called useRouter before setting RouterProvider context');

  return context;
};

export const Link = ({
  href,
  onClick,
  children,
  ...props
}: PropsWithChildren<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps
>) => {
  const router = useRouter();
  if (typeof href !== 'string') {
    throw Error('Custom Link element doesnt handle URL objects');
  }

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <a
      {...props}
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        e.preventDefault();

        router.push(href);
      }}
    >
      {children}
    </a>
  );
};
