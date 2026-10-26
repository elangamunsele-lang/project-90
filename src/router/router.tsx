import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Route = 'home' | 'find-tutor' | 'become-tutor';

type RouterContextValue = {
  route: Route;
  path: string;
  navigate: (to: Route) => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

const VALID: Route[] = ['home', 'find-tutor', 'become-tutor'];

function parseHash(hash: string): Route {
  const cleaned = hash.replace(/^#\/?/, '').split('?')[0];
  if (cleaned === '' ) return 'home';
  return (VALID.includes(cleaned as Route) ? cleaned : 'home') as Route;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== 'undefined' ? parseHash(window.location.hash) : 'home'
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: Route) => {
    if (window.location.hash !== `#/${to === 'home' ? '' : to}`) {
      window.location.hash = to === 'home' ? '#/' : `#/${to}`;
    }
    setRoute(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({ route, path: route, navigate }),
    [route, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
