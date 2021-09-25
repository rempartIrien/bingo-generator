import { FC } from 'react';

import About from './about';
import Generator from './generator';
import Grid from './grid';

export interface RouteDescription {
  path: string;
  component: FC;
}

export const ABOUT_ROUTE: RouteDescription = {
  path: '/about',
  component: About
};

export const GENERATOR_ROUTE: RouteDescription = {
  path: '/generator',
  component: Generator
};

export const GRID_ROUTE: RouteDescription = {
  path: '/grid',
  component: Grid
};
