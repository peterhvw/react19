import { lazy } from 'react';
import { Dog } from './api/getDogs';

export const Home = lazy(() => import('./pages/home/Home'));
export const Browse = lazy(() => import('./pages/browse/Browse'));
export const PLP = lazy(() => import('./pages/plp/Plp'));

export interface RouteConfig {
  path: string;
  element: React.ComponentType<any>;
  props?: Record<string, any>;
  label: string;
}

export const routes = (initialHomeData?:  null, initialBrowseData?: Dog[] | null, initialPlpData?: null): RouteConfig[] => [
  {
    path: '/',
    element: Home,
    props: { initialHomeData },
    label: 'Home'
  },
  {
    path: '/browse',
    element: Browse,
    props: { initialBrowseData },
    label: 'Browse'
  },
  {
    path: '/plp',
    element: PLP,
    props: { initialPlpData },
    label: 'PLP'
  }
];
