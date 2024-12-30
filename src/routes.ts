import { lazy } from 'react';
import { Dog } from './api/getDogs';

export const Home = lazy(() => import('./pages/home/Home'));
export const Browse = lazy(() => import('./pages/browse/Browse'));
export const PLP = lazy(() => import('./pages/plp/Plp'));

export interface RouteConfig {
  path: string;
  element: React.ComponentType<any>;
  props?: any;
  label: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
    label: 'Home'
  },
  {
    path: '/browse',
    element: Browse,
    label: 'Browse'
  },
  {
    path: '/plp',
    element: PLP,
    label: 'PLP'
  }
]; 